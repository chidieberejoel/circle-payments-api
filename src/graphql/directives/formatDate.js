import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLString } from "graphql";
import moment from "moment";

class FormatDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    field.args.push({
      name: "format",
      type: GraphQLString,
    });

    const value = field;

    value.resolve = async (
      source,
      { format, ...otherArgs },
      context,
      info,
    ) => {
      const date = await resolve.call(this, source, otherArgs, context, info);
      return moment(date).format(format || defaultFormat);
    };

    value.type = GraphQLString;
  }
}

export default FormatDateDirective;
