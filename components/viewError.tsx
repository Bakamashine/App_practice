export default function Error({ message }: { message?: string }) {
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
