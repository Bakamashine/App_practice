export default function ShowError({ message }: { message?: string }) {
  return (
    <>
      {message ? (
        <div className="error">
          <p className="text-danger">{message}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
