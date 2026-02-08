import NotFound from "./notfound"

interface DetailBorderProps {
    data: {
        title?: string,
        content?: string,
    },
}
export default function DetailBorder({data}: DetailBorderProps) {
    return (
        <>
        <div
          style={{
            border: "1px solid black",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h2>{data?.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: data?.content ?? "" }}></div>
          {/* <small>Дата: {new Date(onenews?.date).toLocaleDateString()}</small> */}
        </div>
    </>
    )
}