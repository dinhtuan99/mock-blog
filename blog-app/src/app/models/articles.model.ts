export interface IArticle {
    article: Article
}

export interface IArticles {
    articles: Article[],
    articlesCount: number
}

export interface IArticleCreate {
    article: {
        title: string,
        description: string,
        body: string,
        tagList?: string[]
    }
}

export interface IArticleUpdate {
    article: {
        title?: string,
        description?: string,
        body?: string,
    }
}

export interface Article {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}

export interface ArticleListConfig {
    tag?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
}
