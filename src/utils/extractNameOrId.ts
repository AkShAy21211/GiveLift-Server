function extractNameOrId<T extends string | { name: string }>(field: T): string {
    return typeof field === "object" && field !== null && "name" in field ? field.name : field;
  }
  

  export default extractNameOrId;