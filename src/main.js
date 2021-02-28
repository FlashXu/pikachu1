$.ajax({
  url: "./style.css",
  method: "GET",
}).then((cssStr) => {
  const player = {
    n: 0, // 记录当前展示到第几个文字
    intervalTime: 100, // 控制播放速度
    id: undefined, // 记录计时器的id
    displayStr: "",
    init: () => {
      player.play();
      player.bindEvents();
    },
    bindEvents: () => {
      playBtn.onclick = player.play;
      pauseBtn.onclick = player.pause;
      slowBtn.onclick = () => player.adjustSpeed(50);
      normalBtn.onclick = () => player.adjustSpeed(20);
      fastBtn.onclick = () => player.adjustSpeed(1);
    },
    run: () => {
      player.displayStr += player.convertStr(cssStr[player.n]);
      demo1.innerHTML = player.displayStr;
      demo2.innerHTML = cssStr.substr(0, player.n);
      demo1.scrollTop = demo1.scrollHeight;
      player.n++;
      if (player.n >= cssStr.length) {
        player.pause();
        return;
      }
    },
    play: () => {
      player.id = setInterval(player.run, player.intervalTime);
    },
    pause: () => window.clearInterval(player.id),
    adjustSpeed: (time) => {
      player.intervalTime = time;
      player.pause();
      player.play();
    },
    convertStr: (str) => {
      if (str === "\n") {
        return "<br>";
      } else if (str === " ") {
        return "&nbsp";
      } else {
        return str;
      }
    },
  };
  player.init();
});
