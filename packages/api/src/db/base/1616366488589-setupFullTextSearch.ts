import { MigrationInterface, QueryRunner } from 'typeorm'

export class SetupFullTextSearch1616366488589 implements MigrationInterface {
  name = 'SetupFullTextSearch1616366488589'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
    update security set "documentWithWeights" = setweight(to_tsvector(symbol), 'A') ||
    setweight(to_tsvector(coalesce(simple, '')), 'B') ||
    setweight(to_tsvector(description), 'C');
    
    CREATE INDEX document_weights_idx
    ON security
    USING GIN ("documentWithWeights");
            CREATE FUNCTION security_tsvector_trigger() RETURNS trigger AS $$
    begin
    new.documentWithWeights :=
    setweight(to_tsvector('english', coalesce(new.symbol, '')), 'A')
    || setweight(to_tsvector('english', coalesce(new.simple, '')), 'B')
    || setweight(to_tsvector('english', coalesce(new.description, '')), 'C');
    return new;
    end
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
        ON security FOR EACH ROW EXECUTE PROCEDURE security_tsvector_trigger();
    `)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<any> {}
}
