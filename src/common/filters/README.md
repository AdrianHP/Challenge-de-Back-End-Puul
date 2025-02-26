# Prisma Filter

This filter will interact directly with Prisma where and orderBy properties.

Suppose that we have an entity like this:

```typescript
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { ITraceable } from 'src/common/interfaces/traceable';

export class User implements ITraceable {
  id: string;

  name: string;

  email: string;

  createdAt: Date | undefined;

  updatedAt: Date | undefined;
}
```

Prisma will generate the following filters and sortBy fields.

## Filters

There are several types of filters that prisma generates here are some of the more common ones:

- **String Filter**

```typescript
export type StringFilter<$PrismaModel = never> = {
  equals?: string | StringFieldRefInput<$PrismaModel>;
  in?: string[];
  notIn?: string[];
  lt?: string | StringFieldRefInput<$PrismaModel>;
  lte?: string | StringFieldRefInput<$PrismaModel>;
  gt?: string | StringFieldRefInput<$PrismaModel>;
  gte?: string | StringFieldRefInput<$PrismaModel>;
  contains?: string | StringFieldRefInput<$PrismaModel>;
  startsWith?: string | StringFieldRefInput<$PrismaModel>;
  endsWith?: string | StringFieldRefInput<$PrismaModel>;
  not?: NestedStringFilter<$PrismaModel> | string;
};

export type StringNullableFilter<$PrismaModel = never> = {
  equals?: string | StringFieldRefInput<$PrismaModel> | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lt?: string | StringFieldRefInput<$PrismaModel>;
  lte?: string | StringFieldRefInput<$PrismaModel>;
  gt?: string | StringFieldRefInput<$PrismaModel>;
  gte?: string | StringFieldRefInput<$PrismaModel>;
  contains?: string | StringFieldRefInput<$PrismaModel>;
  startsWith?: string | StringFieldRefInput<$PrismaModel>;
  endsWith?: string | StringFieldRefInput<$PrismaModel>;
  not?: NestedStringNullableFilter<$PrismaModel> | string | null;
};
```

- **Date Filter**

```typescript
export type DateTimeFilter<$PrismaModel = never> = {
  equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
  in?: Date[] | string[];
  notIn?: Date[] | string[];
  lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
  lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
  gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
  gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
  not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
};
```

- **Bool Filter**

```typescript
export type BoolFilter<$PrismaModel = never> = {
  equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
  not?: NestedBoolFilter<$PrismaModel> | boolean;
};
```

If more examples are needed refer to the prisma service and check the composition.

## Where Filter

For each query Prisma generates a where clause, this where clause has all the model properties receiving an optional filter according its type. For example, a where clause of the User model will be:

```typescript
export type UserWhereInput = {
  AND?: UserWhereInput | UserWhereInput[];
  OR?: UserWhereInput[];
  NOT?: UserWhereInput | UserWhereInput[];
  id?: StringFilter<'User'> | string;
  email?: StringFilter<'User'> | string;
  name?: StringNullableFilter<'User'> | string | null;
  createdAt?: DateTimeFilter<'User'> | Date | string;
  updatedAt?: DateTimeFilter<'User'> | Date | string;
};
```

## Sort

For each query Prisma generates a sortBy clause, this sortBy clause is a list of a class that has all the model properties. The model should be build having only one item not null and with the desired order ('asc' or 'desc').

This is the generated OrderBy type for the user type.

```typescript
export type UserOrderByWithRelationInput = {
  id?: SortOrder;
  email?: SortOrder;
  name?: SortOrderInput | SortOrder;
  createdAt?: SortOrder;
  updatedAt?: SortOrder;
};
```

## Example

This query gets all users that has a Gmail account and sort by createdAt and email fields.

```typescript
this.dataSource.user.findMany({
  where: {
    email: {
      endsWith: '@gmail.com',
    },
  },
  orderBy: [
    {
      createdAt: 'desc',
    },
    {
      email: 'asc',
    },
  ],
});
```
