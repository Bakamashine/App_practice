import ShowError from "./showError";

export default function ShowErrors({ errors }: { errors?: string[] }) {
  return (
    <>
      {errors && (
        <div className="errors">
          {errors.map((item) => (
            <ShowError key={item} message={item} />
          ))}
        </div>
      )}
    </>
  );
}
