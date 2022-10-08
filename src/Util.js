export const DateFormat = (data = Date.now()) => {
    return new Intl.DateTimeFormat("pt-br").format(data)
}

