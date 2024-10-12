import SliderScore from "../../components/SliderScore";

function HomePage() {
  return (
    <div>
      <div className="text-4xl font-bold">
        <h1>Chào mừng bạn đến với trò chơi đoán số</h1>
        <h2>Còn 7/7 lần</h2>
        <p>Bạn cần tìm kiếm một số từ 1 đến 100</p>
      </div>
      <div>
        <SliderScore />
      </div>
    </div>
  );
}

export default HomePage;
