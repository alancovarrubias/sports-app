import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Game = {
  __typename?: 'Game';
  away_first_half_stat?: Maybe<Stat>;
  away_full_game_stat?: Maybe<Stat>;
  away_team?: Maybe<Team>;
  date?: Maybe<Scalars['String']['output']>;
  full_game_closer?: Maybe<Line>;
  full_game_opener?: Maybe<Line>;
  game_clock?: Maybe<Scalars['String']['output']>;
  home_first_half_stat?: Maybe<Stat>;
  home_full_game_stat?: Maybe<Stat>;
  home_team?: Maybe<Team>;
  id?: Maybe<Scalars['ID']['output']>;
  kicking_team?: Maybe<Team>;
  start_time?: Maybe<Scalars['String']['output']>;
};

export type Line = {
  __typename?: 'Line';
  id?: Maybe<Scalars['ID']['output']>;
  spread?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  games: Array<Game>;
  seasons: Array<Season>;
};


export type QueryGamesArgs = {
  date: Scalars['String']['input'];
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID']['output'];
  year: Scalars['Int']['output'];
};

export type Stat = {
  __typename?: 'Stat';
  ave_per_att?: Maybe<Scalars['Float']['output']>;
  ave_per_car?: Maybe<Scalars['Float']['output']>;
  ave_per_play?: Maybe<Scalars['Float']['output']>;
  c_att?: Maybe<Scalars['String']['output']>;
  carries?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  longest_pass?: Maybe<Scalars['Int']['output']>;
  longest_rush?: Maybe<Scalars['Int']['output']>;
  passing_yards?: Maybe<Scalars['Int']['output']>;
  rushing_yards?: Maybe<Scalars['Int']['output']>;
  score?: Maybe<Scalars['Int']['output']>;
  total_plays?: Maybe<Scalars['Int']['output']>;
  total_yards?: Maybe<Scalars['Int']['output']>;
  typa?: Maybe<Scalars['Float']['output']>;
  typai?: Maybe<Scalars['Float']['output']>;
  typc?: Maybe<Scalars['Float']['output']>;
  typp?: Maybe<Scalars['Float']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  updatedGame?: Maybe<Game>;
};

export type Team = {
  __typename?: 'Team';
  abbr?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Game: ResolverTypeWrapper<Game>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Line: ResolverTypeWrapper<Line>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Season: ResolverTypeWrapper<Season>;
  Stat: ResolverTypeWrapper<Stat>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Team: ResolverTypeWrapper<Team>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Game: Game;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Line: Line;
  Mutation: {};
  Query: {};
  Season: Season;
  Stat: Stat;
  String: Scalars['String']['output'];
  Subscription: {};
  Team: Team;
  User: User;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  away_first_half_stat?: Resolver<Maybe<ResolversTypes['Stat']>, ParentType, ContextType>;
  away_full_game_stat?: Resolver<Maybe<ResolversTypes['Stat']>, ParentType, ContextType>;
  away_team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  full_game_closer?: Resolver<Maybe<ResolversTypes['Line']>, ParentType, ContextType>;
  full_game_opener?: Resolver<Maybe<ResolversTypes['Line']>, ParentType, ContextType>;
  game_clock?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  home_first_half_stat?: Resolver<Maybe<ResolversTypes['Stat']>, ParentType, ContextType>;
  home_full_game_stat?: Resolver<Maybe<ResolversTypes['Stat']>, ParentType, ContextType>;
  home_team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  kicking_team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  start_time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Line'] = ResolversParentTypes['Line']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  spread?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  games?: Resolver<Array<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryGamesArgs, 'date'>>;
  seasons?: Resolver<Array<ResolversTypes['Season']>, ParentType, ContextType>;
};

export type SeasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stat'] = ResolversParentTypes['Stat']> = {
  ave_per_att?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ave_per_car?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ave_per_play?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  c_att?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  carries?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  longest_pass?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  longest_rush?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  passing_yards?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rushing_yards?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_plays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_yards?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  typa?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  typai?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  typc?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  typp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  updatedGame?: SubscriptionResolver<Maybe<ResolversTypes['Game']>, "updatedGame", ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  abbr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  Line?: LineResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Season?: SeasonResolvers<ContextType>;
  Stat?: StatResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

