
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateCommentInput {
    text: string;
    post: string;
}

export interface UpdateCommentInput {
    text?: Nullable<string>;
}

export interface CreatePostInput {
    title: string;
    body: string;
    published: boolean;
}

export interface UpdatePostInput {
    title?: Nullable<string>;
    body?: Nullable<string>;
    published?: Nullable<boolean>;
}

export interface UserInPut {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userRole?: Nullable<string>;
    organization?: Nullable<string>;
    groupId?: Nullable<string>;
}

export interface SignupUserInput {
    name: string;
    email: string;
    password: string;
    age?: Nullable<UnsignedInt>;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface UpdateProfileInput {
    name?: Nullable<string>;
    age?: Nullable<UnsignedInt>;
}

export interface UpdateEmailInput {
    email: string;
    currentPassword: string;
}

export interface UpdatePasswordInput {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ForgotPasswordInput {
    email: string;
}

export interface ResetPasswordInput {
    id: string;
    token: string;
}

export interface ResetPasswordUpdateInput {
    id: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IMutation {
    signup(data: SignupUserInput): UserPayload | Promise<UserPayload>;
    refreshToken(): UserPayload | Promise<UserPayload>;
    logout(): boolean | Promise<boolean>;
    createComment(data: CreateCommentInput): CommentPayload | Promise<CommentPayload>;
    updateComment(id: string, data: UpdateCommentInput): CommentPayload | Promise<CommentPayload>;
    deleteComment(id: string): DeleteCommentPayload | Promise<DeleteCommentPayload>;
    createPost(data: CreatePostInput): PostPayload | Promise<PostPayload>;
    updatePost(id: string, data: UpdatePostInput): PostPayload | Promise<PostPayload>;
    deletePost(id: string): DeletePostPayload | Promise<DeletePostPayload>;
    forgotPassword(data?: Nullable<ForgotPasswordInput>): ForgotPassword | Promise<ForgotPassword>;
    createUser(data?: Nullable<UserInPut>): User | Promise<User>;
    resetPasswordUpdate(data?: Nullable<ResetPasswordUpdateInput>): ResponseType | Promise<ResponseType>;
    deleteAccount(): DeleteAccountPayload | Promise<DeleteAccountPayload>;
}

export interface IQuery {
    comments(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<CommentsConnection> | Promise<Nullable<CommentsConnection>>;
    commentCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;
    post(id: string): Post | Promise<Post>;
    posts(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<PostsConnection> | Promise<Nullable<PostsConnection>>;
    postCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;
    myPosts(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<PostsConnection> | Promise<Nullable<PostsConnection>>;
    user(id: string): User | Promise<User>;
    users(q?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, before?: Nullable<string>, after?: Nullable<string>, filterBy?: Nullable<JSONObject>, orderBy?: Nullable<string>): Nullable<UsersConnection> | Promise<Nullable<UsersConnection>>;
    userCount(q?: Nullable<string>, filterBy?: Nullable<JSONObject>): number | Promise<number>;
    me(): User | Promise<User>;
    resetPassword(data?: Nullable<ResetPasswordInput>): ResetPassword | Promise<ResetPassword>;
}

export interface ISubscription {
    commentAdded(post: string): Comment | Promise<Comment>;
    postAdded(): Post | Promise<Post>;
}

export interface Comment {
    id: string;
    text: string;
    author: User;
    post: Post;
    createdAt: DateTime;
    updatedAt: DateTime;
    version: number;
}

export interface CommentsConnection {
    edges: CommentEdge[];
    pageInfo: PageInfo;
}

export interface CommentEdge {
    node: Comment;
    cursor: string;
}

export interface CommentPayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    comment?: Nullable<Comment>;
}

export interface DeleteCommentPayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    count?: Nullable<number>;
}

export interface ErrorPayload {
    field?: Nullable<string>;
    message?: Nullable<Nullable<string>[]>;
}

export interface PageInfo {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface ResponseType {
    status: boolean;
    message: string;
}

export interface Post {
    id: string;
    title: string;
    body: string;
    published: boolean;
    author: User;
    comments?: Nullable<CommentsConnection>;
    createdAt: DateTime;
    updatedAt: DateTime;
    version: number;
}

export interface PostsConnection {
    edges: PostEdge[];
    pageInfo: PageInfo;
}

export interface PostEdge {
    node: Post;
    cursor: string;
}

export interface PostPayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    post?: Nullable<Post>;
}

export interface DeletePostPayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    count?: Nullable<number>;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userRole: string;
    organization: string;
    groupId: string;
}

export interface UsersConnection {
    edges: UserEdge[];
    pageInfo: PageInfo;
}

export interface UserEdge {
    node: User;
    cursor: string;
}

export interface UserPayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    user?: Nullable<User>;
}

export interface DeleteAccountPayload {
    errors?: Nullable<Nullable<ErrorPayload>[]>;
    count?: Nullable<number>;
}

export interface ForgotPassword {
    message: string;
    link: string;
}

export interface ResetPassword {
    status: boolean;
}

export type DateTime = any;
export type EmailAddress = any;
export type UnsignedInt = any;
export type JSONObject = any;
type Nullable<T> = T | null;
