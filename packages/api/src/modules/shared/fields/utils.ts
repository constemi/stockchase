export type MethodDecoratorFactory = (
  target: Record<string, unknown>,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => any

export function composeMethodDecorators(...factories: MethodDecoratorFactory[]) {
  return (target: Record<string, unknown>, propertyKey: string, descriptor: PropertyDescriptor): any => {
    factories.forEach((factory) => factory(target, propertyKey, descriptor))
  }
}
