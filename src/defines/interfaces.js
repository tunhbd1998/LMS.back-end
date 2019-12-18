export class QueryOptions {
  constructor(conditions, fields, relations) {
    this.conditions = conditions;
    this.fields = fields;
    this.relations = relations;
  }
}

// export class CountQueryOptions {
//   constructor(where, groupByAttributes, countOnColumn) {
//     this.where = where;
//     this.groupByAttributes = groupByAttributes;
//     this.countOnColumn;
//   }
// }
