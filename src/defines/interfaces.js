export class QueryOptions {
  constructor(conditions, fields, relations) {
    this.conditions = conditions;
    this.fields = fields;
    this.relations = relations;
  }
}
