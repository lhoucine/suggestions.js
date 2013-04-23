//Zepto Suggestions plugin 0.1b 
//by houcine cherif <lhoucine.cherif@gmail.com>
//and oussama aid <oussama.aid@gmail.com>

(function($) {

	$
			.extend(
					$.fn,
					{
						suggestions : function(options) {
							// merge passed parameters with the default ones
							var defaults = {
								url : null,
								param : "k",
								max_rows : 5,
								multiples : false,
								unique : false,
								debug : false,
								cleaning : true
							};
							var set = $.extend(defaults, options);

							if (!set.url) {
								// if not url log message to the console,
								// then abort execution
								console
										.log('please set the url option in  suggestions plugin!');
								return false;
							}

							// debug mode
							var tc = 0;
							var d = set.debug;

							// the max results list size
							var mr = set.max_rows;

							// get the current selected element (field)
							var el = this;

							// will hold the field position and size
							var ex, ey, ew, eh;														

							// function to update the plugin size
							var updaterect = function() {
								ex = el.position().top;
								ey = el.position().left;
								ew = el.outerWidth();
								eh = el.outerHeight();

								// set plugin size and position
								sel.css({
									width : ew + 'px',
									left : ex + 'px',
									top : (eh + ey) + 'px'
								});

								if (d)
									console
											.log('updaterect()\n\tfield width =  '
													+ ew
													+ '\n\tfield height = '
													+ eh);
							}

							// will contain the last pressed key
							var lk = null;

							// generate the suggestions id, from the current
							// element id
							var eid = el.attr('id') + '-suggestions';

							// add the required markup to the current
							// element
							el.wrap('<div class="suggestions" style="position:relative">')
							el.after('<select id="' + eid
									+ '" size="2" class="suggestions-dropdown" style="position:absolute;z-index:9999"></select>');

							// retrieve the suggestions plugin element
							var sel = $('#' + eid);
							if (d)
								console.log('load suggestions plugin: #' + eid);

							// hide the plugin on start
							sel.hide();
							if (d)
								console.log('hide suggestions plugin: #' + eid);

							// when user click on the select :
							// (plugin event handler)
							sel
									.click(function() {
										// get the selected option text
										var t = sel.find('option:selected')
												.text();

										// if eneble the multiple values
										// support
										if (set.multiples) {

											elt = el.val();

											if (elt.indexOf(',') > 0) {
												ta = elt.split(',');
												ta.pop();
												ta.push(t);

												// eneble the unique values
												// feature
												if (set.unique) {
													var i = 0;
													var ua = []
													while (i < ta.length) {
														if (ua.indexOf(ta[i]) == -1)
															ua.push(ta[i]
																	.trim())
														i++;
													}
													ta = ua;
												}
												t = ta.toString();
											}

											// cleaning input field by removing
											// duplicated white spaces
											if (set.cleaning) {
												nt = t.replace(/\s/g, '')
														.replace(/,/, ', ')
														.replace(/,$/, '');

												if (d)
													console
															.log('cleaning suggestions  plugin #'
																	+ eid
																	+ '\n\tfrom : "'
																	+ t
																	+ '" \n\tto : "'
																	+ nt + '"');

												t = nt;
											}
										}

										// add the generated value to the
										// current element (field)
										el.val(t);

										// reset the field
										reset()
									})

							// update the current field size on window resize
							$(window).on('resize', function(e) {
								updaterect();
							});

							// update the current field size on focus
							$(el).on('focus', function(e) {
								updaterect();
							});
							
							// hide plugin if clicked outside
							$('html').click(function() {
								reset();
							 });
							// function to hide and reset the plugin (the
							// generated select)
							var reset = function() {
								sel.find('option').remove();
								sel.hide();
								if (d)
									console.log('reset suggestions plugin: #'
											+ eid);
							}

							// function to send requests to the server side
							// file
							var request = function(q) {
								// generate the server-side file url
								var url = set.url + '?' + set.param + '=' + q;
								tc++;
								if (d)
									console.log('send request ' + tc + ' to '
											+ set.url + '\n\tparam = '
											+ set.param + '\n\tvalue = ' + q);
								// parse the JSON response
								$
										.getJSON(
												url,
												function(data) {
													reset();
													var i = 0;
													var opts = '';
													var ds = data.suggestions;
													var n = ds.length
													if (n > 0) {
														if (sel.is(':hidden')) {
															sel.show();
															if (d)
																console
																		.log('show suggestions plugin : #'
																				+ sel
																						.attr('id'));
														}

														if (n < mr)
															r = n;
														else if (n > mr)
															r = mr;
														if (n == 1)
															r = 2
														sel.attr('size', r);
														while (i < n) {
															opt = '<option value="'
																	+ ds[i]
																	+ '">'
																	+ ds[i]
																	+ '</option>';
															opts += opt;
															i++;
														}
														sel.append(opts)
													} else {
														// if no results hide
														// the
														// plugin'select
														sel.hide();
													}
												})
							}

							// element keyup event handler
							el.keyup(function(e) {
								var q = el.val();
								var c = e.keyCode;

								// reset plugin on pressing ',' (user choosed
								// item manually)
								if (c == 188 && set.multiples) {
									reset();
									return;
								}

								if (q.trim() != '') {
									// perform a request each 2 pressed keys
									if (q.length > 1 && q.length % 2 == 0) {
										// check if last pressed key is not
										// a space
										if (lk != 32) {
											// do multiples request
											if (set.multiples) {
												qa = q.split(',')
												q = qa.pop()
												if (q.trim() == '') {
													reset();
													return;
												}
											}
											request(q.trim())
										}
									}
								} else {
									// if field is empty, hide and reset the
									// plugind
									reset();
								}
								// store the last pressed key to prevent
								// multiples spaces requests
								lk = c;
							});

						}

					})
})(window.Zepto || window.jQuery)
