/*차트 함수
1.json 규격
result 이하
1. color(rgba값)
2. 차트형식
1 - 가로 바차트(배열값 2개이상인경우 자동인식)
2 - 세로 바차트
3 - 라인차트
4 - 라인차트(곡선)
5 - 가로 바 + 라인차트
6- 도넛형 차트 //(0번배열만인식)
*/
var id = 'chart1';
var url = '../../resource/js/chart.json';
var type = 1;
var color = new Array('rgba(0,91,172,1)', 'rgba(0,147,212,1)', 'rgba(189,234,216,1)');
var title = new Array('총계', '타인녹취', '대면녹취')
//var title = new Array('녹취');
var dateformat = 'MM월';//moment
var direction = 'right';
chart('chart1', url, 6, color, title, dateformat, direction, 1);

function chart(id, url, type, color, title, dateformat, direction, textyn) {
	d3.json(url,function(error,data){
		d3.select(id + ' > svg').remove();
//		$(id).prev().text( title );
		var margin = {left: 80, top: 10, right: 20, bottom: 50};
		if(type >= 6) margin = {left: 0, top: 0, right: 0, bottom: 0};
		var svg = d3.select('#' + id).append('svg').attr('width', $( '#' + id ).width() ).attr('height', $( '#' + id ).height() );
		var width  = $( '#' + id ).width() - margin.left - margin.right;
		var height = $( '#' + id ).height() - margin.top  - margin.bottom;
		var svgG = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		//최대값 임시값
		var valuemax_tmp = [];
		//item 배열로 변경
		var item = [];
		var data2 = [];
		var total_cnt = 0;

		if(direction == '') direction = 'left';
		//label 중복제거
		for(var i=0;i<data.result.length;i++) {
			data2[i] = [];
			for(var j=0;j<data.result[i].length;j++) {
				var item_tmp = '';
				//날짜형식 변환
				if(i == 0)	item.push(moment(data.result[i][j].item).format(dateformat));
				valuemax_tmp.push(data.result[i][j].value);
				total_cnt += data.result[i][j].value;
				data2[i].push({ x: item[j], y: data.result[i][j].value });
			}
			if(type < 6)	{
				svgG.append('text').attr('class', 'title'+i).attr('x', Math.round(Math.round(100 / (data.result.length + 1)) * ( i + 1) - 5) + '%').attr('y', height + 40 ).style('fill', color[i]).text('● ' + title[i]).style('font-size', '0.8em').attr('alignment-baseline','middle').attr('text-anchor', 'middle');

			}
		}

		//ydomain 최대값
		var valuemax = Math.ceil(Math.max.apply(null, valuemax_tmp) / 10) * 10;

		svgG.selectAll('text').attr('fill', '#666').style('font-size', '1.4em').attr('alignment-baseline','middle');

		switch(type){
			case 1:
				var xScale = d3.scaleBand().domain(item).padding([0.2]).range([0, width]);
				var yScale = d3.scaleLinear().domain([0, valuemax]).rangeRound([height - 16, 8]);
				var x = d3.scaleBand().range([ 0, height]);
				var y = d3.scaleLinear().domain([0, valuemax]);
				svgG.append('g').attr('class', 'xgrid').attr('transform', 'translate(0,' + height + ')').call(make_x_gridlines().tickSize(-height).tickPadding(10));
				svgG.append('g').attr('class', 'ygrid').call(make_y_gridlines().tickSize(-width).ticks(5).tickPadding(5));

				var bar_width = Math.round(Math.round(width / ( data.result.length * item.length)));
				var xbar = d3.scaleBand().range([0, width]).domain(data2[0].map(function(d) { return d.x; }));
				var ybar = d3.scaleLinear().range([0, height]).domain([0, valuemax]);

				//bar 위치 계산
				var bar_totalwidth = Math.round(bar_width * data2.length / 2);
				for(i=0;i<data2.length;i++) {
					var bar_padding = 0;
					svgG
						.selectAll('myRect' + i)
						.data(data2[i])
						.enter()
						.append('rect')
						.attr('y', height)
						.attr('x', function(d) { if(i < 0) bar_padding = 3; else bar_padding = 0; return xScale(d.x) + Math.floor(Math.round(xScale.bandwidth() / data2.length) * i) + bar_padding} )
						.attr('height', 0 )
						.attr('fill', color[i])
						.attr('width', function(d, i) { return Math.round(xScale.bandwidth() / data2.length) - 3; })
						.transition()
						.duration(800)
						.attr('y', function(d) { return height - ybar(d.y); })
						.attr('height',function(d) { return ybar(d.y); })
					if(textyn == 1)
						svgG
							.append('g')
							.selectAll('g')
							.data(data2[i])
							.enter()
							.append('text')
							.attr('class', 'below')
							.attr('y', function(d) { if(d.y > valuemax / 2 ) return height - (ybar(d.y) - 5); else return height - (ybar(d.y) + 20); })
							.attr('x', function(d) { if(i < 0) bar_padding = 3; else bar_padding = 0; return Math.floor(xScale(d.x) + Math.round(xScale.bandwidth() / data2.length) * i) + Math.floor(Math.ceil(xScale.bandwidth() / data2.length)/2 + bar_padding - 1) } )
							.attr('dy', '0.8em')
							.attr('alignment-baseline','middle')
							.attr('text-anchor', 'middle')
							.style('fill', function(d) { if(d.y > valuemax / 2 ) return '#fff'; else return '#000'; })
							.transition()
							.delay(850)
							.text( function(d) { return $.number(d.y); } );
				}
			break;
			case 2://1 - 세로  바차트
				var xScale = d3.scaleLinear().domain([0, valuemax]).range([0, width]);
				var yScale = d3.scaleBand().domain(item).padding([0.2]).range([0, height]);
				var x = d3.scaleLinear().domain([0, width]);
				var y = d3.scaleBand().range([height, 0]);
				//ygrid 총길이
				svgG.append('g').attr('class', 'xgrid').call(make_x_gridlines().tickSize(height).tickPadding(5));
				svgG.append('g').attr('class', 'ygrid').call(make_y_gridlines().tickSize(-width).ticks(4).tickPadding(5));

				var bar_height = Math.round(Math.round(height / ( data2.length * item.length)) - ( 1 * data2.length));

				var bar_totalheight = Math.round(bar_height * data2.length);
				var xbar = d3.scaleLinear().range([0, width]).domain([0, valuemax]);
				var ybar = d3.scaleBand().range([50, height - margin.bottom]).domain(item).padding(0);
				for(i=0;i<data.result.length;i++) {
					var bar_padding = 0;
					var bar_center = Math.round(bar_height / 2) - 5;
					svgG
						.selectAll('myRect' + i)
						.data(data2[i])
						.enter()
						.append('rect')
						.attr('y', function(d) { return yScale(d.x) + Math.round((bar_height + 1) * i)  } )
						.attr('x', 0)
						.attr('height', bar_height)
						.attr('fill', color[i])
						.attr('width', 0)
						.transition()
						.duration(800)
						.attr('width', function(d) { return xbar(d.y); });
					if(textyn == 1)
						svgG
							.append('g')
							.selectAll('g')
							.data(data2[i])
							.enter()
							.append('text')
							.attr('class', 'below')
							.attr('x',function(d) {  if(d.y > valuemax / 2 ) return xbar(d.y) - 10; else return xbar(d.y) +10; })
							.attr('y', function(d) { return yScale(d.x) - 3 + Math.floor((bar_height + 1 ) * i) + bar_center  })
							.attr('dy', '0.8em')
							.attr('alignment-baseline','middle')
							.attr('text-anchor', function(d) {  if(d.y > valuemax / 2 ) return 'end'; else return 'start' })
							.style('fill', function(d) { if(d.y > valuemax / 2 ) return '#fff'; else return '#000'; })
							.transition()
							.delay(850)
							.text( function(d) { return $.number(d.y); } );
				}
			break;
			case 3:
			case 4:
				var xScale = d3.scaleBand().domain(item).rangeRound([0, width]);
				var yScale = d3.scaleLinear().domain([0, valuemax]).nice().rangeRound([height, 0]);
				svgG.append('g').attr('class', 'xgrid').attr('transform', 'translate(0,' + height + ')').call(make_x_gridlines().tickSize(-height).tickPadding(10));
				svgG.append('g').attr('class', 'ygrid').call(make_y_gridlines().tickSize(-width).ticks(5).tickPadding(5));

				var line = d3.line().x(function(d) {return xScale(d.x);}).y(function(d) { return yScale(d.y); });
				if(type == 4) line.curve(d3.curveBasis);//곡선

				var lineG = svgG.append('g').selectAll('g').data(data2).enter().append('g');
				var path =  lineG.append('path').attr('class', 'lineChart').attr('fill','none').attr('stroke-width', '2').style('stroke', function(d, i) { return color[i]; }).attr('d', line);

				var totalLength = path.node().getTotalLength();
				path.attr('stroke-dasharray', function(d) {return this.getTotalLength()}).attr('stroke-dashoffset', totalLength).transition().duration(700).ease(d3.easeSin).attr('stroke-dashoffset', 0);

				for(var i =0;i<data2.length;i++) {
					lineG.selectAll('linetext')
						.data(data2[i])
						.enter()
						.append('text')
						.attr('fill', '#666')
						.attr('x', function(d) { return xScale(d.x)})
						.attr('y', function(d) {  if(yScale(d.y) < 50) return yScale(d.y) + 20; else return yScale(d.y) - 5})
						.attr('text-anchor', 'middle')
						.style('font-size', '1em')
						.style('stroke-width', '1')
						.transition()
						.delay(850)
						.text( function(d) { return $.number(d.y); } );

					lineG.selectAll('linedot')
						.data(data2[i])
						.enter()
						.append('circle')
						.attr('fill', color[i])
						.attr('stroke', 'none')
						.attr('cx', function(d) { return xScale(d.x) })
						.attr('cy', function(d) {return yScale(d.y) })
						.attr('r', 3);

				}
			break;
			case 5:
				var xScale = d3.scaleBand().domain(item).range([0, width]);
				var yScale = d3.scaleLinear().domain([0, valuemax]).rangeRound([height - 16, 8]);
				var x = d3.scaleBand().range([ 0, height]);
				var y = d3.scaleLinear().domain([0, valuemax]);
				svgG.append('g').attr('class', 'xgrid').attr('transform', 'translate(0,' + height + ')').call(make_x_gridlines().tickSize(-height).tickPadding(10));
				svgG.append('g').attr('class', 'ygrid').call(make_y_gridlines().tickSize(-width).ticks(5).tickPadding(5));


				var bar_width = Math.round(Math.round(width / ((data2.length - 1) * item.length)));
				var xbar = d3.scaleBand().range([0, width]).domain(data2[0].map(function(d) { return d.x; }));
				var ybar = d3.scaleLinear().range([0, height]).domain([0, valuemax]);

				var line = d3.line().x(function(d) {return xScale(d.x) + Math.round(width / ((data2.length - 1) * item.length));}).y(function(d) { return yScale(d.y); });
				var lineG = svgG.append('g').selectAll('g').data(Array(data2[0])).enter().append('g');
				var path =  lineG.append('path').attr('class', 'lineChart').attr('d', function(d) { return line(d); }).attr('stroke-width', '2').style('stroke', function(d, i) { return color[0]; }).attr('fill','none') ;

				var totalLength = path.node().getTotalLength();
				path.attr('stroke-dasharray', function(d) {return this.getTotalLength()}).attr('stroke-dashoffset', totalLength).transition().duration(700).ease(d3.easeSin).attr('stroke-dashoffset', 0);

				var bar_totalwidth = Math.round(bar_width * (data2.length - 1) / 2);
				for(i=1;i<data.result.length;i++) {
					svgG
						.selectAll('myRect' + i)
						.data(data2[i])
						.enter()
						.append('rect')
						.attr('y', height)
						.attr('x', function(d) { if(i < 0) bar_padding = 3; else bar_padding = 0; return xScale(d.x) + Math.floor(Math.round(xScale.bandwidth() / (data2.length + 1)) * i) + (bar_padding * i)} )
						.attr('height', 0 )
						.attr('fill', color[i])
						.attr('width', function(d, i) { return Math.round(xScale.bandwidth() / data2.length) - 3; })
						.transition()
						.duration(800)
						.attr('y', function(d) { return height - ybar(d.y); })
						.attr('height',function(d) { return ybar(d.y); })
					if(textyn == 1)
						svgG
							.append('g')
							.selectAll('g')
							.data(data2[i])
							.enter()
							.append('text')
							.attr('class', 'below')
							.attr('y', function(d) { if(d.y > valuemax / 2 ) return height - (ybar(d.y) - 5); else return height - (ybar(d.y) + 20); })
							.attr('x', function(d) { if(i < 0) bar_padding = 3; else bar_padding = 0; return Math.floor(xScale(d.x) + Math.round(xScale.bandwidth() / (data2.length + 1)) * i) + Math.floor(Math.ceil(xScale.bandwidth() / data2.length)/2 + bar_padding - 1) } )
							.attr('dy', '0.8em')
							.attr('alignment-baseline','middle')
							.attr('text-anchor', 'middle')
							.style('fill', function(d) { if(d.y > valuemax / 2 ) return '#fff'; else return '#000'; })
							.transition()
							.delay(850)
							.text( function(d) { return $.number(d.y); } );
				}
			break;
			case 6://json 배열 0번만 인식
				var xScale = d3.scalePoint().domain(item).padding([0.1]).range([0, width]);
				var yScale = d3.scaleLinear().domain([0, valuemax]).nice().range([height, 0]);
				var x = d3.scaleLinear().range([0, width]);
				var y = d3.scaleLinear().range([height, 0]);

				//svgG.append('g').attr('class', 'xgrid').attr('transform', 'translate(0,' + height + ')').call(make_x_gridlines().tickSize(-height));
				//svgG.append('g').attr('class', 'ygrid').call(make_y_gridlines().tickSize(-width).ticks(4).tickPadding(5));

				var radius = Math.min(width, height) / 2;
				var inner = Math.round(radius/2);
				if(type == 4) inner = 0;
				var arc = d3.arc().outerRadius(radius).innerRadius(inner);
				var pie = d3.pie().sort(null).startAngle(1.1*Math.PI).endAngle(3.1*Math.PI).value(function(d) { return d.y; });

				var g = svg.selectAll('.arc').data(pie(data2[0])).enter().append('g').attr('class', 'arc').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');g.append('path').style('fill', function(d,i) { return color[i]; }).transition().duration(800).attrTween('d', function(d) {	var i = d3.interpolate(d.startAngle+0.1, d.endAngle);return function(t) {d.endAngle = i(t); return arc(d)	}});
				g.append('text').attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; }).attr('dy', '.35em').attr('fill', 'white').attr('text-anchor', 'middle').transition().delay(1000).text(function(d) { return d.data.x; });
				//총 녹취건수
				svgG.append('text').attr('class', 'titlecenter').attr('x', parseInt(svg.style('width')) / 2).attr('y', parseInt(svg.style('height')) / 2 - 30).style('fill', color[0]).text('총' + title[0] +'건수' ).style('font-size', '2em').attr('alignment-baseline','middle').attr('text-anchor', 'middle');
				//총갯수 중앙표기
				svgG.append('text').attr('class', 'total').attr('x', parseInt(svg.style('width')) / 2).attr('y', parseInt(svg.style('height')) / 2 + 10).style('fill', color[0]).text('0').style('font-size', '4em').attr('alignment-baseline','middle').attr('text-anchor', 'middle');
				$('.total').animateNumber({ number: total_cnt, numberStep: $.animateNumber.numberStepFactories.separator(',') },{duration: 1000});
				var j1 = 0;
				var j2 = 0;
				var y_position = 0;

				//범례 좌우로 배치
				for(var i=0;i<item.length;i++) {
					if( item.length > 8 && i >= Math.floor(item.length / 2)) {
						y_position = height / 3 + (30 * j1);
						j1++;
					} else {
						y_position = height / 3 + (30 * j2);
						j2++;
					}
					svgG.append('text').attr('class', 'title'+i).attr('x', parseInt(svg.style('width')) / 2 - (radius * 2) ).attr('y', y_position).style('fill', color[i]).text('● ' + item[i] + '\n').style('font-size', '1em').attr('alignment-baseline','middle').attr('text-anchor', 'middle');
				}
			break;
		}
		//공통함수
		function make_x_gridlines() {	return d3.axisBottom(xScale).ticks(5); }
		function make_y_gridlines() {	return d3.axisLeft(yScale).ticks(5);}

	})
}
