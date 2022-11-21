var row = 30; //全局设置网格的数量
var speed = 200;
var period;
var thickness = 3;

var r = "rgba(255, 255, 255, 0.9)";
var n = "rgba(255, 255, 255, 0)";

// 状态数组
var lifeRule = new Array();

//细胞皿数组
var cell = new Array();

var tr; //表格行

var suspand; //演化标记，用于停止演化

//文档初始化代码块
$(function () {
	initAll();
});

// 全局初始化
function initAll() {
	period = 0;

	$("#cell-count").attr("value", row);
	$("#speed").attr("value", speed);
	$("#period").text(period);
	$("#thickness").attr("value", thickness);

	//初始化细胞皿数组
	for (var i = 0; i < row; i++) {
		cell[i] = new Array();
		for (var j = 0; j < row; j++) {
			cell[i][j] = 0;
		}
	}

	//初始化状态数组
	for (var i = 0; i < row; i++) {
		lifeRule[i] = new Array();
		for (var j = 0; j < row; j++) {
			lifeRule[i][j] = 0;
		}
	}

	// 初始化表格
	for (var i = 0; i < row; i++) {
		var tr = $("<tr>");
		for (var j = 0; j < row; j++) {
			tr.append($("<td>"));
		}
		tr.appendTo($("#cell-table"));
	}

	// 单元格点击事件
	$("td").click(function () {
		var color = $(this).css("background-color");

		var rowIndex = $(this).parent().index();
		var cellIndex = $(this).index();

		// 改变颜色和cell真值数组
		if (color == r) {
			cell[rowIndex][cellIndex] = 0;
			$(this).css("background-color", n);
		} else {
			cell[rowIndex][cellIndex] = 1;
			$(this).css("background-color", r);
		}
	});

	tr = $("#cell-table").find("tr");

	// 随机布置细胞皿
	$("#btn-randomSet").click(function () {
		for (var i = 0; i < row; i++)
			for (var j = 0; j < row; j++) {
				var flag = getRandomNum(0, 10);
				if (flag < thickness) {
					cell[i][j] = 1;
					tr.eq(i).find("td").eq(j).css("background-color", r);
				} else {
					cell[i][j] = 0;
					tr.eq(i).find("td").eq(j).css("background-color", n);
				}
			}
	});
}

$(function () {
	$("#cell-count").change(function () {
		var rows = $(this).val();
		if (rows <= 0 || rows > 100) {
			alert("行列数量取值范围为：(0,100]");
			$(this).val(row);
		}
	});

	$("#speed").change(function () {
		var s = $(this).val();
		if (s < 0 || s > 5000) {
			alert("演化速度取值范围为：[0,5000]");
			$(this).val(speed);
		} else {
			speed = $(this).val();
		}
	});

	// 开始演化
	$("#btn-start").click(function () {
		var text = $(this).val();
		console.log(text);
		if (text == "开始演化") {
			$(this).val("暂停");
			suspand = setInterval(evolution, speed);
		} else {
			$(this).val("开始演化");
			clearInterval(suspand);
		}
	});

	// 下一周期
	$("#next-term").click(function () {
		evolution();
	});

	//重置
	$("#resetCell").click(function () {
		clearInterval(suspand);

		$("#btn-start").val("开始演化");

		row = $("#cell-count").val();
		speed = $("#speed").val();
		period = $("#period").text();
		thickness = $("#thickness").val();

		$("#cell-table").empty();

		initAll();
	});
});

// 获取最小值到最大值之前的整数随机数
function getRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return Min + Math.round(Rand * Range);
}

function evolution() {
	var tr = $("#cell-table").find("tr");
	setCellBool();
	for (var i = 0; i < lifeRule.length; i++)
		for (var j = 0; j < lifeRule[0].length; j++) {
			if (lifeRule[i][j] == 1) {
				cell[i][j] = 1;
				tr.eq(i).find("td").eq(j).css("background-color", r);
			} else {
				cell[i][j] = 0;
				tr.eq(i).find("td").eq(j).css("background-color", n);
			}
		}
	$("#period").text(++period);
}

//设置下一周期的细胞状态
function setCellBool() {
	for (var i = 0; i < lifeRule.length; i++)
		for (var j = 0; j < lifeRule[0].length; j++) {
			switch (countAround(i, j)) {
				case 0:
				case 1:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
					lifeRule[i][j] = 0;
					break;
				case 2:
					lifeRule[i][j] = cell[i][j];
					break;
				case 3:
					lifeRule[i][j] = 1;
					break;
			}
		}
}

// 统计某单元格周围的细胞数量
function countAround(r, c) {
	var count = 0;
	//上一行
	count += countCell(r - 1, c - 1);
	count += countCell(r - 1, c);
	count += countCell(r - 1, c + 1);
	//同行
	count += countCell(r, c - 1);
	count += countCell(r, c + 1);
	// 下一行
	count += countCell(r + 1, c - 1);
	count += countCell(r + 1, c);
	count += countCell(r + 1, c + 1);

	return count;
}

//统计一个单元格内的细胞数量
function countCell(r, c) {
	if (r < 0 || r >= row || c < 0 || c >= row || cell[r][c] == 0) return 0;
	return 1;
}

$("#btn-back").click(function () {
	window.location.href = window.location.origin;
});
