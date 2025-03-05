$(document).ready(function() {
    // 检查是否存在目录
    if ($("#toc").length) {
        // 获取所有标题
        var headings = $("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");
        var tocLinks = $("#toc a");
        var toc = $("#toc");
        
        // 初始化折叠功能
        function initCollapsibleToc() {
            // 为所有有子菜单的项添加点击事件
            $("#toc li").each(function() {
                if ($(this).find("ul").length > 0) {
                    var $link = $(this).children("a");
                    
                    // 点击事件处理
                    $link.on("click", function(e) {
                        e.preventDefault();
                        var $parent = $(this).parent();
                        $parent.toggleClass("active");
                        
                        // 阻止事件冒泡
                        return false;
                    });
                }
            });
            
            // 默认折叠所有子菜单
            $("#toc li ul").parent().removeClass("active");
        }
        
        // 高亮当前目录项的函数
        function highlightToc() {
            // 获取当前滚动位置
            var scrollPosition = $(window).scrollTop();
            
            // 移除所有活动类但保留展开/折叠状态
            tocLinks.removeClass("active");
            
            // 找出当前视图中的标题
            var currentHeading = null;
            
            headings.each(function() {
                var top = $(this).offset().top - 100; // 添加一些偏移以提前高亮
                
                if (scrollPosition >= top) {
                    currentHeading = $(this);
                }
            });
            
            // 如果找到当前标题，高亮对应的目录项
            if (currentHeading) {
                var id = currentHeading.attr("id");
                var activeLink = $("#toc a[href='#" + id + "']");
                
                // 高亮当前项
                activeLink.addClass("active");
                
                // 高亮所有父级链接
                var $parents = activeLink.parents("li");
                $parents.children("a").addClass("active");
                
                // 首先折叠所有菜单
                $("#toc li").removeClass("active");
                
                // 然后只展开当前项的父级菜单
                $parents.addClass("active");
                
                // 自动滚动目录，使当前高亮项可见
                if (toc.length) {
                    var tocHeight = toc.height();
                    var activeLinkOffset = activeLink.offset().top - toc.offset().top;
                    var activeLinkHeight = activeLink.outerHeight();
                    
                    // 如果当前项在目录可视区域之外，则滚动目录
                    if (activeLinkOffset < 0 || activeLinkOffset + activeLinkHeight > tocHeight) {
                        // 计算滚动位置，使当前项在目录中间位置
                        var scrollTo = activeLinkOffset - (tocHeight / 2) + (activeLinkHeight / 2);
                        toc.animate({
                            scrollTop: toc.scrollTop() + scrollTo
                        }, 200);
                    }
                }
            } else {
                // 如果没有找到，默认高亮第一项
                $("#toc a:first").addClass("active");
            }
        }
        
        // 初始化折叠功能
        initCollapsibleToc();
        
        // 页面加载时运行
        highlightToc();
        
        // 滚动时运行
        $(window).scroll(function() {
            highlightToc();
        });
        
        // 点击目录链接时滚动到对应位置
        $("#toc a").on("click", function(e) {
            // 如果是有子菜单的项，则已经在上面处理了
            // 如果是没有子菜单的项，则滚动到对应位置
            if (!$(this).parent().find("ul").length) {
                var href = $(this).attr("href");
                if (href.startsWith("#")) {
                    e.preventDefault();
                    var targetOffset = $(href).offset().top - 70; // 减去固定导航栏的高度
                    $("html, body").animate({
                        scrollTop: targetOffset
                    }, 500);
                }
            }
        });
    }
});