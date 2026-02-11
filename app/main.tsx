import flower from "../assets/flower.jpg";
export default function MainPage() {
  return (
    <>
      <h1 className="text-center">Добро пожаловать в приложение</h1>
      <div className="flexCenter mt-3">
        <img src={flower} alt="flower" width={300} height={200} />
      </div>
    </>
  );
}
