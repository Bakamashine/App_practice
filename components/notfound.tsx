export default function NotFound({
  text,
  any = true,
  fullText,
}: {
  text?: string;
  any?: boolean;
  fullText?: string;
}) {
  return (
    <div className="notfound">
      {!fullText ? (
        <>{any ? <p>{text} не найдены</p> : <p>{text} не найдено</p>}</>
      ) : (
        <p>{fullText}</p>
      )}
    </div>
  );
}
