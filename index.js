const startAgain = () => {
  location.reload();
};
const matrix = document.getElementById("matrix");
const mainBtn = document.getElementById("btn1");
const btnMinus = document.getElementById("btn2");
const btnPlus = document.getElementById("btn3");
const matrixBtn = document.getElementById("matrixBtn");
matrixBtn.addEventListener("click", startAgain);
const minimum = 100;
const maximum = 999;
const minimumId = 1000;
const maximumId = 9999;
let arrMatrixWrapperAll = [];
let arrMatrixPoints = [];
let arrMatrixPointsNew = [];
let columnRight = [];
let columnDown = [];
let totalArr = [];
let arrTotalPoints = [];
let isReRendering = false;

let m = undefined;
let n = undefined;
let x = undefined;

const createOnclick = () => {
  n = document.getElementById("m").value;
  m = document.getElementById("n").value;
  x = document.getElementById("x").value;
  n = parseInt(n);
  m = parseInt(m);
  x = parseInt(x);
  x = parseInt(x);
  creatingAnArray(m, n, x);
};

mainBtn.addEventListener("click", createOnclick);

document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    createOnclick();
  }
});

const creatingAnArray = (m, n, x) => {
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      const randomnumber =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      const id =
        Math.floor(Math.random() * (maximumId - minimumId + 1)) + minimumId;
      let obj = {};
      obj["amount"] = randomnumber;
      obj["id"] = id;
      if (columnRight[i] === undefined) {
        columnRight[i] = [];
      }
      columnRight[i][j] = obj;
    }
  }
  createMatrix(m, n, x);
};

const removeSimilarPoints = () => {
  let matrixPoints = document.getElementsByClassName("matrixPoint");
  for (let i = 0; i < matrixPoints.length; i += 1) {
    matrixPoints[i].classList.remove("similarPoints");
  }
};

const getSimilarPoints = (e, xx) => {
  let int = parseInt(e.target.innerText);
  let pointMinimum = int - xx;
  let pointMaximum = int + xx;
  let matrixPoints = document.getElementsByClassName("matrixPoint");
  const merged = columnRight.flat(1);
  merged.map((pp, indexx) => {
    if (pp.amount > pointMinimum && pp.amount < pointMaximum) {
      matrixPoints[indexx].classList.add("similarPoints");
    }
  });
};
Object.defineProperty(Array.prototype, "chunk", {
  value: function(chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});
const getTotalPercentage = e => {
  const totalPoints = document.getElementsByClassName("matrixWrapperHidden");
  arrTotalPoints = Array.from(totalPoints);
  let find = parseInt(e.toElement.innerText);
  const isIndex1 = element => element === find;
  const isIndex = totalArr.findIndex(isIndex1);

  arrMatrixPointsNew = arrMatrixPoints.chunk(m);
  arrMatrixPointsNew[isIndex].map(point => {
    point.style.fontSize = "0.8em";
    point.classList.add("red");
    const int = parseInt(point.innerText);
    let percent = (100 * int) / find;
    percent = parseFloat(percent.toFixed(1));
    let percentFirst = parseInt(percent);
    point.style.background = `linear-gradient(to top, rgb(144, 142, 237) ${percentFirst}% , rgb(62, 243, 228) 0%)`; //, rgb(62, 243, 228) 80%
    point.style.color = "rgb(66, 59, 59)";
    point.innerText = `${percent}%`; //%
  });
};

const removeTotalPercentage = e => {
  arrMatrixPoints.forEach(point => {
    point.remove();
  });
  arrMatrixWrapperAll.forEach(point => {
    point.remove();
  });
  createMatrix(m, n, x);
};

const createMatrix = (m, n, x) => {
  document.getElementById("buttons").style.display = "block";
  document.getElementById("total-m-wrapper").style.display = "flex";
  document.getElementById("average-wrapper").style.display = "flex";
  matrix.style.width = m * 40 + "px";
  document.getElementById("matrix").style.display = "flex";
  document.getElementById("parent").style.display = "none";
  document.getElementById("matrixBtn").style.display = "block";
  document.getElementById("btn2").style.display = "block";
  document.getElementById("btn3").style.display = "block";
  for (i = 0; i < n; i += 1) {
    for (j = 0; j < m; j += 1) {
      const newDiv = document.createElement("div");
      newDiv.classList += "matrixPoint";
      const newContent = document.createTextNode(columnRight[i][j].amount);
      newDiv.appendChild(newContent);
      let element = document.getElementById("matrix");
      element.appendChild(newDiv);
    }
  }

  totalArr = [];
  const createAnElement = () => {
    columnRight.map((c, i) => {
      let total = columnRight[i].reduce(function(acc, obj) {
        return acc + obj.amount;
      }, 0);
      const totalInt = parseInt(total);
      totalArr.push(totalInt);
      const newDiv = document.createElement("div");
      newDiv.classList += "matrixWrapperHidden ";
      const newContent = document.createTextNode(total);
      newDiv.appendChild(newContent);
      const element = document.getElementById("total-m-wrapper");
      element.appendChild(newDiv);
      newDiv.addEventListener("mouseover", function(e) {
        getTotalPercentage(e);
      });
      newDiv.addEventListener("mouseout", function(e) {
        removeTotalPercentage(e);
      });
    });
  };

  createAnElement();
  columnDown = [];
  for (let i = 0; i < columnRight.length; i += 1) {
    // turning an array, to count average by columns
    for (let j = 0; j < columnRight[i].length; j += 1) {
      if (columnDown[j] === undefined) {
        columnDown[j] = [];
      }
      columnDown[j][i] = columnRight[i][j];
    }
  }

  columnDown.map((c, i) => {
    let total = columnDown[i].reduce(function(acc, obj) {
      return acc + obj.amount;
    }, 0);
    let average = total / n;

    const newDiv = document.createElement("div");
    newDiv.classList += "matrixWrapperHidden ";
    const newContent = document.createTextNode(parseInt(average));
    newDiv.appendChild(newContent);

    const element = document.getElementById("average-wrapper");
    element.appendChild(newDiv);
  });
  const matrixPoints = document.getElementsByClassName("matrixPoint");
  const matrixWrapperAll = document.getElementsByClassName(
    "matrixWrapperHidden"
  );
  arrMatrixWrapperAll = Array.from(matrixWrapperAll);
  arrMatrixPoints = Array.from(matrixPoints);

  const mouseEventListenerforArr = () => {
    arrMatrixPoints.forEach(point => {
      point.addEventListener("mouseover", function(e) {
        getSimilarPoints(e, x);
      });
      point.addEventListener("mouseout", function() {
        removeSimilarPoints();
      });
    });
  };

  const reRenderMatrix = eventtt => {
    // isReRendering = true;
    const int = parseInt(eventtt.target.innerText);
    const string = event.target.innerText;
    columnRight.map((line, i) => {
      columnRight[i].some(function(obj) {
        if (obj.amount === int) {
          obj.amount = obj.amount + 1;
          arrMatrixPoints.forEach(point => {
            point.remove();
          });
          arrMatrixWrapperAll.forEach(point => {
            point.remove();
          });
          setTimeout(() => {
            createMatrix(m, n, x);
          }, 2);
        }
      });
    });
    mouseEventListenerforArr();
  };

  const addClickeventListener = () => {
    arrMatrixPoints.forEach(point => {
      point.addEventListener("click", function(e) {
        reRenderMatrix(e);
      });
    });
  };

  addClickeventListener();
  mouseEventListenerforArr();
  arrMatrixPointsNew = [];
  let counter = columnRight.flat(1);
  counter = counter.length;

  if (counter != arrMatrixPoints.length) {
    removeTotalPercentage();
  }
}; // end of create matrix

const minusBtn2 = () => {
  if (n < 2) {
    alert('Минимальное значение M - 1, нажмите "+"');
    return;
  }
  if (m < 2) {
    alert("Минимальное значение N - 1");
    return;
  }
  n = n - 1;
  arrMatrixPoints.forEach(point => {
    point.remove();
  });
  arrMatrixWrapperAll.forEach(point => {
    point.remove();
  });

  const slised = columnRight.slice(0, -1);
  columnRight = slised;
  setTimeout(() => {
    createMatrix(m, n, x);
  }, 2);
};

const plusBtn3 = () => {
  n = n + 1;
  let arr = [];
  arrMatrixPoints.forEach(point => {
    point.remove();
  });
  arrMatrixWrapperAll.forEach(point => {
    point.remove();
  });

  for (let i = 0; i < m; i += 1) {
    const randomnumber =
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    const id =
      Math.floor(Math.random() * (maximumId - minimumId + 1)) + minimumId;
    let obj = {};
    obj["amount"] = randomnumber;
    obj["id"] = id;

    arr.push(obj);
  }
  columnRight.push(arr);
  setTimeout(() => {
    createMatrix(m, n, x);
  }, 2);
};

btnMinus.addEventListener("click", minusBtn2);
btnPlus.addEventListener("click", plusBtn3);
