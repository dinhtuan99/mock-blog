export interface IComment {
    comment: Comment
}

export interface IComments {
    comments: Comment[]
}

export interface Comment {
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}