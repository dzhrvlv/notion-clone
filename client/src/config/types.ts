export type UserDataLoginType = {
    login: string,
    password: string
}

export type ErrorType = {
    response: {
        data: {
            message: string
        }
    }
}

export type PageStoreType = {
    _id: string,
    object: "page",
    title: string
}

export type PageType = {
    _id: string,
    object: "page",
    user: string,
    title: string,
    content: string[],
    status: boolean,
    focus: {
        focusRow: string
    }
}