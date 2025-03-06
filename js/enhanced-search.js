/**
 * Enhanced Jekyll Search
 * Based on SimpleJekyllSearch but with improved relevance and result display
 */

(function() {
    'use strict';
    
    var EnhancedJekyllSearch = {
        init: function(options) {
            var defaults = {
                searchInput: null,
                resultsContainer: null,
                dataSource: '',
                searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
                noResultsText: 'No results found',
                limit: 10,
                fuzzy: false,
                exclude: []
            };

            var settings = this.mergeOptions(defaults, options);
            
            this.settings = settings;
            this.loadData(settings.dataSource);
            this.registerInput();
            
            return this;
        },
        
        mergeOptions: function(defaults, options) {
            var option;
            for (option in options) {
                if (options.hasOwnProperty(option)) {
                    defaults[option] = options[option];
                }
            }
            return defaults;
        },
        
        loadData: function(dataSource) {
            var self = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', dataSource, true);
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        self.data = JSON.parse(xhr.responseText);
                        console.log('Search data loaded: ' + self.data.length + ' items');
                        
                        // 处理数据，提取标题信息
                        self.processHeadings();
                    } catch (e) {
                        console.error('Failed to parse search data: ' + e);
                    }
                }
            };
            
            xhr.send();
        },
        
        processHeadings: function() {
            // 如果数据中没有标题信息，我们需要从内容中提取
            var self = this;
            var headingItems = [];
            
            // 遍历所有数据项
            for (var i = 0; i < self.data.length; i++) {
                var item = self.data[i];
                
                // 如果内容中包含 h2 标签，提取它们
                if (item.content) {
                    var headingRegex = /<h2\s+id="([^"]+)"[^>]*>(.*?)<\/h2>/gi;
                    var match;
                    
                    while ((match = headingRegex.exec(item.content)) !== null) {
                        var headingId = match[1];
                        var headingText = match[2].replace(/<[^>]+>/g, ''); // 移除任何嵌套的HTML标签
                        
                        // 创建一个新的搜索项
                        var headingItem = {
                            title: headingText,
                            url: item.url + "#" + headingId,
                            content: "", // 可以添加标题后的内容
                            parentTitle: item.title,
                            isHeading: true
                        };
                        
                        // 复制原始项的其他属性
                        for (var prop in item) {
                            if (item.hasOwnProperty(prop) && !headingItem.hasOwnProperty(prop)) {
                                headingItem[prop] = item[prop];
                            }
                        }
                        
                        headingItems.push(headingItem);
                    }
                }
            }
            
            // 将标题项添加到数据中
            self.data = self.data.concat(headingItems);
        },
        
        registerInput: function() {
            var self = this;
            var input = this.settings.searchInput;
            
            input.addEventListener('keyup', function(e) {
                // 处理方向键导航
                if (e.keyCode === 40) { // 向下箭头
                    e.preventDefault();
                    self.navigateResults('down');
                    return;
                } else if (e.keyCode === 38) { // 向上箭头
                    e.preventDefault();
                    self.navigateResults('up');
                    return;
                } else if (e.keyCode === 13) { // 回车键
                    var activeItem = self.settings.resultsContainer.querySelector('li a.active');
                    if (activeItem) {
                        e.preventDefault();
                        window.location.href = activeItem.getAttribute('href');
                        return;
                    }
                }
                
                self.search(e.target.value);
            });
            
            // 关闭结果当点击外部
            document.addEventListener('click', function(e) {
                if (!self.settings.resultsContainer.contains(e.target) && 
                    e.target !== self.settings.searchInput) {
                    self.clearResults();
                }
            });
        },
        
        navigateResults: function(direction) {
            var container = this.settings.resultsContainer;
            var items = container.querySelectorAll('li a');
            if (items.length === 0) return;
            
            var activeItem = container.querySelector('li a.active');
            var index = -1;
            
            if (activeItem) {
                // 移除当前活动项的活动状态
                activeItem.classList.remove('active');
                
                // 找到当前活动项的索引
                for (var i = 0; i < items.length; i++) {
                    if (items[i] === activeItem) {
                        index = i;
                        break;
                    }
                }
            }
            
            // 计算新的索引
            if (direction === 'down') {
                index = (index + 1) % items.length;
            } else {
                index = (index - 1 + items.length) % items.length;
            }
            
            // 设置新的活动项
            items[index].classList.add('active');
            
            // 确保活动项在视图中
            var itemRect = items[index].getBoundingClientRect();
            var containerRect = container.getBoundingClientRect();
            
            if (itemRect.bottom > containerRect.bottom) {
                container.scrollTop += (itemRect.bottom - containerRect.bottom);
            } else if (itemRect.top < containerRect.top) {
                container.scrollTop -= (containerRect.top - itemRect.top);
            }
        },
        
        search: function(query) {
            if (!query || query.length < 2) {
                this.clearResults();
                return;
            }
            
            var results = this.findMatches(query);
            this.displayResults(results, query);
        },
        
        findMatches: function(query) {
            var matches = [];
            var data = this.data;
            var settings = this.settings;
            var queryLower = query.toLowerCase();
            
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var matchDetails = this.findMatchDetails(item, queryLower);
                
                if (matchDetails.score > 0) {
                    matches.push({
                        item: item,
                        score: matchDetails.score,
                        matchType: matchDetails.matchType
                    });
                }
                
                if (matches.length >= settings.limit * 3) {
                    break; // Get more than we need, then sort and trim
                }
            }
            
            // Sort by score (highest first)
            matches.sort(function(a, b) {
                return b.score - a.score;
            });
            
            // Take only the top results
            matches = matches.slice(0, settings.limit);
            
            return matches;
        },
        
        findMatchDetails: function(item, query) {
            var score = 0;
            var matchType = '';
            
            // 如果是标题项，给予更高的权重
            if (item.isHeading) {
                if (item.title && item.title.toLowerCase().indexOf(query) !== -1) {
                    score += 15; // 更高的权重
                    matchType = 'heading';
                    // 标题完全匹配给予额外加分
                    if (item.title.toLowerCase() === query) {
                        score += 10;
                    }
                    // 标题以查询开头给予额外加分
                    if (item.title.toLowerCase().indexOf(query) === 0) {
                        score += 5;
                    }
                }
            }
            
            // Title match (highest weight)
            if (item.title && item.title.toLowerCase().indexOf(query) !== -1) {
                score += 10;
                matchType = 'title';
                // Bonus for exact title match
                if (item.title.toLowerCase() === query) {
                    score += 10;
                }
                // Bonus for title starting with query
                if (item.title.toLowerCase().indexOf(query) === 0) {
                    score += 5;
                }
            }
            
            // Summary match (medium weight)
            if (item.summary && item.summary.toLowerCase().indexOf(query) !== -1) {
                score += 5;
                if (!matchType) matchType = 'summary';
            }
            
            // Tags match (medium weight)
            if (item.tags && item.tags.toLowerCase().indexOf(query) !== -1) {
                score += 5;
                if (!matchType) matchType = 'tags';
            }
            
            // Keywords match (medium weight)
            if (item.keywords && item.keywords.toLowerCase().indexOf(query) !== -1) {
                score += 5;
                if (!matchType) matchType = 'keywords';
            }
            
            // Content match (lower weight but important for full-text search)
            if (item.content && item.content.toLowerCase().indexOf(query) !== -1) {
                score += 3;
                if (!matchType) matchType = 'content';
            }
            
            return {
                score: score,
                matchType: matchType
            };
        },
        
        displayResults: function(results, query) {
            var container = this.settings.resultsContainer;
            var template = this.settings.searchResultTemplate;
            var noResults = this.settings.noResultsText;
            
            // Clear results
            container.innerHTML = '';
            
            if (results.length === 0) {
                container.innerHTML = '<li>' + noResults + '</li>';
                container.style.display = 'block';
                return;
            }
            
            for (var i = 0; i < results.length; i++) {
                var match = results[i];
                var item = match.item;
                var output = template;
                
                // 替换模板变量
                output = output.replace(/\{(.*?)\}/g, function(match, prop) {
                    if (prop === 'url') {
                        return item.url;
                    }
                    if (prop === 'title') {
                        var title = item.isHeading ? item.title : item.title;
                        // 高亮搜索词
                        return this.highlightText(title, query);
                    }
                    return item[prop] || '';
                }.bind(this));
                
                // 添加到结果
                container.innerHTML += output;
            }
            
            // 显示结果容器
            container.style.display = 'block';
        },
        
        highlightText: function(text, query) {
            if (!text || !query) return text;
            
            var queryLower = query.toLowerCase();
            var textLower = text.toLowerCase();
            var result = '';
            var lastIndex = 0;
            var index = textLower.indexOf(queryLower);
            
            while (index !== -1) {
                // 添加前面的文本
                result += text.substring(lastIndex, index);
                // 添加高亮的搜索词
                result += '<strong class="search-highlight">' + text.substring(index, index + query.length) + '</strong>';
                
                lastIndex = index + query.length;
                index = textLower.indexOf(queryLower, lastIndex);
            }
            
            // 添加剩余的文本
            result += text.substring(lastIndex);
            
            return result;
        },
        
        clearResults: function() {
            this.settings.resultsContainer.innerHTML = '';
            this.settings.resultsContainer.style.display = 'none';
        }
    };
    
    window.EnhancedJekyllSearch = EnhancedJekyllSearch;
})();