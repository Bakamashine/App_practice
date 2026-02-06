export default interface Paginate {
    links: {
        next?: string,
        previous?: string
    },
    count: number,
    total_pages: number,
    results: any[]
}