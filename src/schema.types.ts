import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
	[P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type Author = {
	__typename?: "Author";
	books: Array<Book>;
	id: Scalars["Int"]["output"];
	name: Scalars["String"]["output"];
};

export type Book = {
	__typename?: "Book";
	id: Scalars["Int"]["output"];
	title: Scalars["String"]["output"];
};

export type Query = {
	__typename?: "Query";
	author?: Maybe<Author>;
	authors: Array<Author>;
	book?: Maybe<Book>;
	books: Array<Book>;
};

export type QueryAuthorArgs = {
	id: Scalars["Int"]["input"];
};

export type QueryBookArgs = {
	id: Scalars["Int"]["input"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>;
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs,
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {},
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {},
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Author: ResolverTypeWrapper<Partial<Author>>;
	Book: ResolverTypeWrapper<Partial<Book>>;
	Boolean: ResolverTypeWrapper<Partial<Scalars["Boolean"]["output"]>>;
	Int: ResolverTypeWrapper<Partial<Scalars["Int"]["output"]>>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Partial<Scalars["String"]["output"]>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Author: Partial<Author>;
	Book: Partial<Book>;
	Boolean: Partial<Scalars["Boolean"]["output"]>;
	Int: Partial<Scalars["Int"]["output"]>;
	Query: {};
	String: Partial<Scalars["String"]["output"]>;
};

export type AuthorResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Author"] = ResolversParentTypes["Author"],
> = {
	books?: Resolver<Array<ResolversTypes["Book"]>, ParentType, ContextType>;
	id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Book"] = ResolversParentTypes["Book"],
> = {
	id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
	title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends
		ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
	author?: Resolver<
		Maybe<ResolversTypes["Author"]>,
		ParentType,
		ContextType,
		RequireFields<QueryAuthorArgs, "id">
	>;
	authors?: Resolver<Array<ResolversTypes["Author"]>, ParentType, ContextType>;
	book?: Resolver<
		Maybe<ResolversTypes["Book"]>,
		ParentType,
		ContextType,
		RequireFields<QueryBookArgs, "id">
	>;
	books?: Resolver<Array<ResolversTypes["Book"]>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Author?: AuthorResolvers<ContextType>;
	Book?: BookResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
};
