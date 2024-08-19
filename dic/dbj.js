var dbj = (function() {

	// 初期設定
	init = function() {
		window.resizeTo(700, 700);
		window.scrollTo(10,10);
		document.title = 'dicForDBJ ver0.1';

		var htmlDiv = '<div></div>';
		$('body').append(htmlDiv);

		var comment = '<span>※./dic/data.txtにデータをコピペ(区切りはtabキー)。<br>キーワードを入力すると、自動検索を行います。ご不明な点がございましたら、劉までご連絡ください。</span><br>';
		var htmlInput = 'キーワード：<input type="text" onkeyup="find(this.value)">';
		$('div').append(comment).append(htmlInput);
		$('input').focus();
	}

	// 設計書よりデータを取得
	getData = function() {
		var dataAjax = $.ajax({url:'dic/data.txt', async:false}).responseText;
		return dataAjax.replace(/\r\n/g,',').replace(/\n/g,',').replace(/\r/g,',').split(',');
	}

	// 辞書を作成
	createDic = function(data) {
		var tblIdx = 0; //テーブルIDのインデックス
		var trIdx = 0; // 行のインデックス

		$.each(data, function(idx, item) {
			var keyVal = $.trim(item).replace(/\u3000+/g,' ').replace(/\s+/g,',').split(',');
			var key = $.trim(keyVal[0]);

			if (key != null && key != '') {
				var isHyphen = key.indexOf('-') >= 0 ? true : false;
				if (idx == 0 || isHyphen) {
					// 新テーブル
					tblIdx = idx;
					trIdx = 0;

					var htmlTbl = '<table id=tbl' + tblIdx + '></table>';
					$('div').append(htmlTbl);
				}

				if (!isHyphen) {
					var tblid = '#tbl' + tblIdx;
					var htmlTr = '<tr></tr>';
					$(tblid).append(htmlTr);

					var tr = $(tblid).find('tr').eq(trIdx);
					var htmlTd = '';
					for (var i=0; i<keyVal.length; i++) {
						htmlTd += trIdx == 0 ? '<th>0</th>' : '<td>1</td>';
					}
					tr.append(htmlTd);

					for (var i=0; i<keyVal.length; i++) {
						tr.children().eq(i).text(keyVal[i]);
					}

					trIdx++;
				}
			}
		})
	}

	// 自動検索
	find = function(key) {
		// 検索結果をクリア
		$('table').hide();
		$('tr').removeClass("selected_tr");
		$('td').removeClass("selected_td");
		
		// 未入力の場合は検索しない
		if (key.length < 1) return;
		
		// 検索
		$.each($('tr').children(), function() {
			if ($(this).text().indexOf(key) >= 0) {
				$(this).addClass('selected_td');
				$(this).parent().addClass('selected_tr');
				$(this).parents('table').show();
			}
		})
	}

	return this;
})(jQuery);