var rotate_x_number = 0,
rotate_y_number = 0,
gaming = true;
// 멀티 이벤트 리스너(* 미해결)
var addEventListeners = function(element, events, func) {
	// 엘리먼트 요소가 배열이 아닐경우 배열화
	if(Array.isArray(element) == false) element = [element];
	if(window.addEventListener) element.forEach(elm => events.forEach(evt => elm.addEventListener(evt, func)));
	else if(window.attachEvent) element.forEach(elm => events.forEach(evt => elm.attachEvent(evt, func)));
}

var make_cylinder = function(cylinder_elm,diameter,height_size,amount=100,bg_color=["#fff","#ddd","#000"]) {
	var cylinder_elm;
	var diameter;					// 지름
	var height_size;				// 높이
	var amount;						// 사이드 면의 갯수
	var bg_color;					// 면 색상

	// 원 둘레 구하기
	this.get_circumference = function() {
		circumference = (diameter / 2) * 2 * Math.PI;
		return Math.round(circumference);
	}

	// 원을 구성할 사각형의 가로 길이 구하기
	this.get_quadrangle_size = function() {
		return Math.ceil(this.get_circumference() / amount) + 1;
	}

	// 원기둥을 구성할 면들을 생성
	this.make_figure = function() {
		cylinder = document.createElement('figure');
		cylinder.setAttribute("class","piece");
		cylinder.style.cssText = 'width:' + (diameter) + 'px;height:' + (diameter) + 'px;transform-style:preserve-3d;transform-origin:center middle;position:relative;margin:9px;animation-iteration-count:1;animation-delay:0s;animation-fill-mode:forwards;animation-play-state:running;animation-timing-function:linear;transform:rotate(45deg);';

		cylinder_inner = document.createElement('figure');
		cylinder_inner.setAttribute("class","piece_inner");
		cylinder_inner.style.cssText = 'width:' + (diameter) + 'px;height:' + (diameter) + 'px;transform-style:preserve-3d;transform-origin:center middle;animation-iteration-count:1;animation-delay:0s;animation-fill-mode:forwards;animation-play-state:running;animation-timing-function:linear;';
		cylinder.appendChild(cylinder_inner);

		// 상단면 생성
		section = document.createElement('figure');
		section.setAttribute("class","BLACK");
		section.style.cssText = 'width:' + (diameter) + 'px;height:' + (diameter) + 'px;border:1px solid ' + bg_color[0] + ';border-radius:' + Math.round(diameter / 2) + 'px;background:' + bg_color[0] + ';position:absolute;top:0px;left:0px;transform:rotateX(0deg) rotateY(0deg)  translateX(0px) translateY(0px) translateZ(-' + (height_size / 2) + 'px);transform-origin:center middle;box-shadow: inset 0 0 20px hsla(0,0%,0%,.03), inset 0 0 20px hsla(0,0%,0%,.03);';
		cylinder_inner.appendChild(section);

		// 사이드면 생성
		witdth_size = this.get_quadrangle_size();		// 사이드 면 당 가로 사이즈
		for(i = 0; i < amount; i++) {
			section = document.createElement('figure');
			section.setAttribute("class","side_section");
			section.style.cssText = 'width:' + witdth_size + 'px;height:' + height_size + 'px;background:' + bg_color[1] + ';position:absolute;top:' + ((diameter - height_size) / 2) + 'px;left:' + ((diameter / 2) - (witdth_size / 2)) + 'px;transform:rotateX(90deg) rotateY(-' + Math.round((360 / amount) * i) + 'deg) translateX(0px) translateY(0px) translateZ(' + (diameter / 2) + 'px);';
			cylinder_inner.appendChild(section);
		}

		// 하단면 생성
		section = document.createElement('figure');
		section.setAttribute("class","WHITE");
		section.style.cssText = 'width:' + (diameter) + 'px;height:' + (diameter) + 'px;border:1px solid ' + bg_color[2] + ';border-radius:' + Math.round(diameter / 2) + 'px;background:' + bg_color[2] + ';position:absolute;top:0px;left:0px;transform:rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(' + (height_size / 2) + 'px);transform-origin:center middle;box-shadow: inset 0 0 25px hsla(80,80%,80%,.10), inset 0 0 25px hsla(50,50%,50%,.10);';
		cylinder_inner.appendChild(section);

		cylinder_elm.appendChild(cylinder);
		return cylinder;
	}

	return this.make_figure();
}

var rotation_screen = function() {
	var start_pos,new_rotate_x_number,new_rotate_y_number;
	var game_func = parent.game_loading;
	var addDropEvent;

	get_position = function(event) {
		return [(event.pageX), (event.pageY)];
	}

	move_event = function(event) {
		remove_drop_event();
		now_pos = get_position(event);
		x_pos = Math.round((now_pos[0] - start_pos[0]) / (document.body.clientWidth / 360));
		y_pos = Math.round((now_pos[1] - start_pos[1]) / (document.body.clientHeight / 360));
		new_rotate_x_number = rotate_x_number - x_pos;
		new_rotate_y_number = rotate_y_number - y_pos;
		document.querySelector("#board_outer").style.transform = "rotateX(" + new_rotate_y_number + "deg) rotate(" + new_rotate_x_number + "deg)";
	}

	remove_move = function(event) {
		rotate_x_number = new_rotate_x_number;
		rotate_y_number = new_rotate_y_number;
		document.body.removeEventListener("mousemove", move_event);
		document.body.removeEventListener("touchmove", move_event);
	}

	event_start = function(event) {
		window.ondragstart = function() { return false; }
		new_rotate_x_number = rotate_x_number;
		new_rotate_y_number = rotate_y_number;
		start_pos = get_position(event);
		addEventListeners(document.body, ["mousemove","touchmove"], move_event);
		addEventListeners(document.body, ["mouseup","touchend"], remove_move);
		add_drop_event();
	}

	var scale_size = 1;
	wheel_control = function(event) {
		var delta = event.detail ? event.detail * (-120) : event.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
		scale_size += Math.floor((delta - 20) / 10) / 100;
		if(scale_size < 0.5) scale_size = 0.5;
		if(scale_size > 2) scale_size = 2;
		document.querySelector("#wrap").style.setProperty("transform","scale(" + scale_size + "," + scale_size + ")");
	}

	scale_reset = function() {
		document.querySelector("#wrap").style.setProperty("transform","scale(1,1)");
	}

	addEventListeners(document.body, ["mousewheel"], wheel_control);
	addEventListeners(document.body, ["dblclick"], scale_reset);
	addEventListeners(document.body, ["mousedown","touchstart"], event_start);
}

var game_loading = function() {
	var board_object = document.querySelector("#othello_board");
	var base_length = 100;
	var turn = 0;
	var pieces = ['BLACK','WHITE'];
	var attacker = 0;
	var cell_object;
	var cells;
	var xy_cell_count;

	// game load
	board_loading = function() {
		for(i = 0; i < base_length; i++) {
			cell_elm = document.createElement('li');
			num_elm = document.createElement('span');
			num_elm.setAttribute('class','num');
			cell_elm.appendChild(num_elm);
			board_object.appendChild(cell_elm);
		}

		cell_object = document.querySelectorAll('#othello_board > li');
		cells = Array.prototype.slice.call(cell_object);
		xy_cell_count = Math.sqrt(cells.length);
		drop_piece("",44,'WHITE',false);
		drop_piece("",45,'BLACK',false);
		drop_piece("",54,'BLACK',false);
		drop_piece("",55,'WHITE',false);
		status_update();
		rotation_screen();
		addEventListeners(document.querySelector(".btn_reset"), ["click"], reset_game);
		addEventListeners(cells, ["click"], drop_piece);
	}

	calcu_idx = function(x_position, y_position) {
		return x_position + (y_position * xy_cell_count);
	}

	reverse_piece = function(rcells,color) {
		for(i = 0; i < rcells.length; i++) {
			cells[rcells[i]].setAttribute('color',color);
			cells[rcells[i]].lastChild.style.setProperty("animation-iteration-count","1");
			cells[rcells[i]].lastChild.style.setProperty("animation-delay","0." + i + "s");
			cells[rcells[i]].lastChild.style.setProperty("animation-fill-mode","forwards");
			cells[rcells[i]].lastChild.style.setProperty("animation-play-state","running");
			cells[rcells[i]].lastChild.style.setProperty("animation-timing-function","linear");
			cells[rcells[i]].lastChild.style.setProperty("animation-duration","0.5s");
			cells[rcells[i]].lastChild.style.setProperty("animation-name","reverse_" + color);

			cells[rcells[i]].lastChild.firstChild.style.setProperty("animation-iteration-count","1");
			cells[rcells[i]].lastChild.firstChild.style.setProperty("animation-delay","0." + i + "s");
			cells[rcells[i]].lastChild.firstChild.style.setProperty("animation-fill-mode","forwards");
			cells[rcells[i]].lastChild.firstChild.style.setProperty("animation-play-state","running");
			cells[rcells[i]].lastChild.firstChild.style.setProperty("animation-timing-function","linear");
			cells[rcells[i]].lastChild.firstChild.style.setProperty("animation-duration","0.5s");
			cells[rcells[i]].lastChild.firstChild.style.setProperty("animation-name","reverse_turn_" + color);
		}
	}

	// update top status bar information
	status_update = function() {
		black_cnt = 0;
		white_cnt = 0;
		for(i = 0; i < cells.length; i++) {
			if(cells[i].getAttribute('color') == "BLACK") black_cnt++;
			else if(cells[i].getAttribute('color') == "WHITE") white_cnt++;
		}
		document.querySelector("#show_color_turn").setAttribute("class","turn_" + pieces[turn%2]);
		document.querySelector("#BLACK_score").textContent = black_cnt;
		document.querySelector("#WHITE_score").textContent = white_cnt;
	}

	remove_drop_event = function() {
		for(i = 0; i < cells.length; i++) {
			cells[i].removeEventListener("click", drop_piece);
		}
	}

	add_drop_event = function() {
		if(gaming == true) {
			addEventListeners(cells, ["click"], drop_piece, true);
		}
	}

	check_cell = function(idx,color) {
		x_position = idx % xy_cell_count;
		y_position = Math.floor(idx / xy_cell_count);
		x_position_r = xy_cell_count - x_position - 1;
		y_position_r = xy_cell_count - y_position - 1;

		// 각 축 끝의 인덱스
		top_position = x_position;
		bottom_position = x_position + ((xy_cell_count - 1) * xy_cell_count);
		left_position = y_position * xy_cell_count;
		right_position = (y_position * xy_cell_count) + xy_cell_count - 1;

		// 좌상 끝 인덱스
		if(x_position < y_position) min_pos = x_position;
		else min_pos = y_position;
		d_position0 = idx - (min_pos * (xy_cell_count + 1));

		// 우상 끝 인덱스
		if(x_position_r < y_position) min_pos = x_position_r;
		else min_pos = y_position;
		d_position1 = idx - (min_pos * (xy_cell_count - 1));

		// 좌하 끝 인덱스
		if(x_position < y_position_r) min_pos = x_position;
		else min_pos = y_position_r;
		d_position2 = idx + (min_pos * (xy_cell_count - 1));

		// 우하 끝 인덱스
		if(x_position_r < y_position_r) min_pos = x_position_r;
		else min_pos = y_position_r;
		d_position3 = idx + (min_pos * (xy_cell_count + 1));

		change_cells_array = [];

		// 좌측에서 현재자리까지 체크
		checking = false;
		left_array = [];
		for(i = (idx - 1); i >= left_position; i--) {
			if(cells[i].lastChild.getAttribute('class') == "piece") {
				if(cells[i].getAttribute('color') != color) {
					left_array.push(i);
				}
				else {
					checking = true;
					break;
				}
			}
			else {
				checking = false;
				break;
			}
		}

		if(checking == true) {
			change_cells_array = change_cells_array.concat(left_array);
		}

		// 우측에서 현재자리까지 체크
		checking = false;
		right_array = [];
		for(i = (idx + 1); i <= right_position; i++) {
			if(cells[i].lastChild.getAttribute('class') == "piece") {
				if(cells[i].getAttribute('color') != color) {
					right_array.push(i);
				}
				else {
					checking = true;
					break;
				}
			}
			else {
				checking = false;
				break;
			}
		}

		if(checking == true) {
			change_cells_array = change_cells_array.concat(right_array);
		}

		// 상단으로 부터 현재 자리 까지 체크
		checking = false;
		top_array = [];
		for(i = (idx - xy_cell_count); i >= top_position; i -= xy_cell_count) {
			if(cells[i].lastChild.getAttribute('class') == "piece") {
				if(cells[i].getAttribute('color') != color) {
					top_array.push(i);
				}
				else {
					checking = true;
					break;
				}
			}
			else {
				checking = false;
				break;
			}
		}

		if(checking == true) {
			change_cells_array = change_cells_array.concat(top_array);
		}

		// 하단으로 부터 현재 자리 까지 체크
		checking = false;
		bottom_array = [];
		for(i = (idx + xy_cell_count); i <= bottom_position; i += xy_cell_count) {
			if(cells[i].lastChild.getAttribute('class') == "piece") {
				if(cells[i].getAttribute('color') != color && i != bottom_position) {
					bottom_array.push(i);
				}
				else {
					checking = true;
					break;
				}
			}
			else {
				checking = false;
				break;
			}
		}

		if(checking == true) {
			change_cells_array = change_cells_array.concat(bottom_array);
		}

		// 좌상으로 부터 현재 자리 까지 체크
		checking = false;
		lefttop_array = [];
		last_number = ((idx - d_position0) / (xy_cell_count + 1));
		for(j = 0; j < last_number; j++) {
			i = idx - ((xy_cell_count + 1) * (j + 1));
			if(cells[i].lastChild.getAttribute('class') == "piece") {
				if(cells[i].getAttribute('color') != color) {
					lefttop_array.push(i);
				}
				else {
					checking = true;
					break;
				}
			}
			else {
				checking = false;
				break;
			}
		}

		if(checking == true) {
			change_cells_array = change_cells_array.concat(lefttop_array);
		}

		// 우상으로 부터 현재 자리 까지 체크
		checking = false;
		righttop_array = [];
		last_number = ((idx - d_position1) / (xy_cell_count - 1));
		for(j = 0; j < last_number; j++) {
			i = idx - ((xy_cell_count - 1) * (j + 1));
			if(cells[i].lastChild.getAttribute('class') == "piece") {
				if(cells[i].getAttribute('color') != color) {
					righttop_array.push(i);
				}
				else {
					checking = true;
					break;
				}
			}
			else {
				checking = false;
				break;
			}
		}

		if(checking == true) {
			change_cells_array = change_cells_array.concat(righttop_array);
		}

		// 좌하으로 부터 현재 자리 까지 체크
		checking = false;
		leftbottom_array = [];
		last_number = ((d_position2 - idx) / (xy_cell_count - 1));
		for(j = 0; j < last_number; j++) {
			i = idx + ((xy_cell_count - 1) * (j + 1));
			if(cells[i].lastChild.getAttribute('class') == "piece") {
				if(cells[i].getAttribute('color') != color && i != d_position2) {
					leftbottom_array.push(i);
				}
				else {
					checking = true;
					break;
				}
			}
			else {
				checking = false;
				break;
			}
		}

		if(checking == true) {
			change_cells_array = change_cells_array.concat(leftbottom_array);
		}

		// 우하으로 부터 현재 자리 까지 체크
		checking = false;
		rightbottom_array = [];
		last_number = ((d_position3 - idx) / (xy_cell_count + 1));
		for(j = 0; j < last_number; j++) {
			i = idx + ((xy_cell_count + 1) * (j + 1));
			if(cells[i].lastChild.getAttribute('class') == "piece") {
				if(cells[i].getAttribute('color') != color) {
					rightbottom_array.push(i);
				}
				else {
					checking = true;
					break;
				}
			}
			else {
				checking = false;
				break;
			}
		}

		if(checking == true) {
			change_cells_array = change_cells_array.concat(rightbottom_array);
		}

		return change_cells_array;
	}

	game_over = function() {
		gaming = false;
		console.log("GAME OVER");
		status_update();
		black_score = document.querySelector("#BLACK_score").textContent;
		white_score = document.querySelector("#WHITE_score").textContent;
		console.log("BLACK " + black_score + " : WHITE " + white_score);
		if(black_score > white_score) {
			console.log("BLACK WIN!");
		}
		else if(black_score < white_score) {
			console.log("WHITE WIN!");
		}
		else {
			console.log("DRAW GAME");
		}
	}

	counting_piece = function() {
		black_count = 0;
		white_count = 1;
		piece_elm = document.querySelectorAll(".piece");
		piece_array = Array.prototype.slice.call(piece_elm);

		for(i = 0; i < piece_array.length; i++) {
			if(piece_array[i].parentNode.getAttribute("color") == "BLACK") black_count++;
			if(piece_array[i].parentNode.getAttribute("color") == "WHITE") white_count++;
		}

		return [black_count,white_count];
	}

	// check cell color
	turn_action = function(idx,color) {
		remove_drop_event();
		change_cells_array = check_cell(idx,color);
		reverse_piece(change_cells_array,color);
		counted = counting_piece();

		if((counted[0] == document.querySelectorAll(".piece").length || counted[1] == document.querySelectorAll(".piece").length) || document.querySelectorAll(".piece").length >= base_length) {
			game_over();
		}
		else {
			addDropEvent = setTimeout(function() {
				add_drop_event();
			},800);
		}
	}

	reset_game = function() {
		window.location.reload();
	}

	// drop the piece
	drop_piece = function(event, cell_num="", color_str="", checking=true) {
		attacker = turn % 2;
		if(cell_num == "") cell_num = cells.indexOf(this);
		cell_object = cells[cell_num];

		if(cell_object.lastChild.getAttribute("class") == "piece") {
			return false;
		}

		if(!color_str) color_str = pieces[attacker];

		check_result = check_cell(cell_num,color_str);
		//console.log(check_result);
		if(checking == true && check_result.length == 0) {
			//alert("놓을 수 없는 자리 입니다.");
			return false;
		}

		piece_elm = make_cylinder(cell_object,80,8,32,["linear-gradient(#f3f3f3 0%, #ffffff 100%);","#aaa","linear-gradient(#000 0%, #4f4f4f 100%)"]);
		cell_object.setAttribute("color",color_str);

		piece_elm.style.setProperty("animation-duration","0.1s");
		piece_elm.style.setProperty("animation-name","drop_" + color_str);

		cell_object.appendChild(piece_elm);
		cell_object.removeEventListener("click",drop_piece);
		if(checking == true) turn_action(cell_num, color_str);
		turn++;
		status_update();
	}

	this.board_loading();
}

window.onload = function() {
	game_loading();
}
