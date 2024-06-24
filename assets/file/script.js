let isDragging = false;
let startY;
let scrollTop;

const scrollContainer = document.querySelector('.scroll-container');

scrollContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.pageY - scrollContainer.offsetTop;
    scrollTop = scrollContainer.scrollTop;
    scrollContainer.classList.add('active');
    scrollContainer.style.cursor = 'grabbing';
});

scrollContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollContainer.classList.remove('active');
    scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mouseup', () => {
    isDragging = false;
    scrollContainer.classList.remove('active');
    scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const y = e.pageY - scrollContainer.offsetTop;
    const walk = (y - startY) * 1.5; // Adjust the scroll speed
    scrollContainer.scrollTop = scrollTop - walk;
});

// Add touch support
scrollContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startY = e.touches[0].pageY - scrollContainer.offsetTop;
    scrollTop = scrollContainer.scrollTop;
    scrollContainer.classList.add('active');
}, { passive: true });

scrollContainer.addEventListener('touchend', () => {
    isDragging = false;
    scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const y = e.touches[0].pageY - scrollContainer.offsetTop;
    const walk = (y - startY) * 1.5; // Adjust the scroll speed
    scrollContainer.scrollTop = scrollTop - walk;
}, { passive: true });

function changeContent() {
    var mainBg = document.getElementById('mainBg');
    var storyBg = document.getElementById('storyBg');
    var logo = document.getElementById('logo');
    var playButton = document.getElementById('playButton');
    var rectangleContainer = document.getElementById('rectangleContainer');
    var statusContainer = document.getElementById('statusContainer');
    var scrollcontainer = document.getElementById('scrollcontainer');
    var rightside = document.getElementById('rightside');
    const returnButton = document.getElementById('returnButton');
    var rightside = document.getElementById('rightside');
    var profilemoments = document.getElementById('profilemoments');
   
    rightside.style.display = 'none';
    
    if (mainBg.classList.contains('hidden')) {
        mainBg.classList.remove('hidden');
        storyBg.classList.add('hidden');
        logo.classList.add('hidden');
        scrollContainer.classList.add('hidden');
        returnButton.classList.add('hidden');
        rightside.style.display = 'none';
        profilemoments.style.display = 'none'; 
        setTimeout(() => {
            rectangleContainer.classList.add('hidden');
            rectangleContainer.style.display = 'none';
            statusContainer.style.display = 'none';
        }, 1000); // Match the transition duration
        playButton.classList.remove('hidden');
    } else {
                playButton.classList.add('hidden');
                console.log('ima');
        mainBg.classList.add('hidden');
        storyBg.classList.remove('hidden');
        logo.classList.remove('hidden');
        scrollcontainer.style.display = 'none';
        rectangleContainer.style.display = 'flex';
        statusContainer.style.display = 'flex';
        returnButton.classList.remove('hidden');
        rightside.style.display = 'none';
        profilemoments.style.display = 'none'; 
        setTimeout(() => {
            rectangleContainer.classList.remove('hidden');
            statusContainer.classList.remove('hidden');
        }, 10); // Small delay to ensure the display change is recognized

    }
}

document.getElementById('logo').addEventListener('click', function() {
    var storyBg = document.getElementById('storyBg');
    var storyText = document.getElementById('storyText');
    var blackrectangle = document.getElementById('black-rectangle');
    var scrollcontainer = document.getElementById('scrollcontainer');
    var ellipse = document.getElementById('momentContainer');
    var rightside = document.getElementById('rightside');
    var profilemoments = document.getElementById('profilemoments');
    profilemoments.style.display = 'none'; 
    rightside.style.display = 'none';

    storyBg.style.backgroundImage = "url('assets/images/momentbg.png')";
    scrollcontainer.style.display = 'block'; 
    
    rectangleContainer.style.display = 'none';
    statusContainer.style.display = 'none';
    returnButton.style.display = 'flex';
    ellipse.style.display = 'flex';
    storyText.style.display = 'none';
    blackrectangle.style.display = 'none';
    logo.style.display = 'none'
    
});

document.getElementById('returnButton').addEventListener('click', function() {
    var storyBg = document.getElementById('storyBg');
    var storyText = document.getElementById('storyText');
    var blackrectangle = document.getElementById('black-rectangle');
    var scrollcontainer = document.getElementById('scrollcontainer');
    var ellipse = document.getElementById('momentContainer');
    var returnButton = document.getElementById('returnButton');
    var chartdiv = document.getElementById('chartdiv');
    var rightside = document.getElementById('rightside');
    var profilemoments = document.getElementById('profilemoments');

    profilemoments.style.display = 'none'; 
    rightside.style.display = 'none';
    storyBg.style.backgroundImage = "url('assets/images/storybg.png')";
    scrollcontainer.style.display = 'none'; 
    rectangleContainer.style.display = 'flex';
    statusContainer.style.display = 'flex';
    returnButton.style.display = 'none';
    ellipse.style.display = 'none';
    storyText.style.display = 'block';
    blackrectangle.style.display = 'block';
    logo.style.display = 'block';
    chartdiv.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', function() {
    const storyText = "你正在参与一个对事业前途至关重要的项目谈判,这时接到家人的电话,你万分挚爱的父亲病危住院,有可能就是最后的诀别时刻。你必须在家庭和事业之间做出艰难抉择:";
    const storyTextElement = document.getElementById('storyText');
    typeWriter(storyText, storyTextElement, 100, function() {
        const rectangles = [
            { text: "A.你是否立即请假放下手头工作,不计代价地飞回家乡? 需要支付昂贵的机票费用1500 LOAI,但也许这是与父亲最后相聚的机会。", id: 'rectangle1', textId: 'text1' },
            { text: "B.你选择继续参与谈判,同时汇款5000 LOAI请人在家中悉心照料父亲? 等到自己谈判结束之后立刻赶回去。", id: 'rectangle2', textId: 'text2' },
            { text: "C.你是否坦白地向合作方解释家中变故,诚挚请求延期谈判? 这可能会让你失去本次合作的机会,父亲的情况又难料。", id: 'rectangle3', textId: 'text3' },
            { text: "C.你是否与合伙人深入协调,寻求其中一人临时顶替你的岗位? 然而,若双方缺乏足够的默契,结果可能难以令人满意。", id: 'rectangle4', textId: 'text4' },
        ];

        function showNextRectangle(index) {
            if (index < rectangles.length) {
                const rect = rectangles[index];
                const rectElement = document.getElementById(rect.id);
                const textElement = document.getElementById(rect.textId);
                rectElement.style.display = 'block';
                typeWriter(rect.text, textElement, 100, function() {
                    showNextRectangle(index + 1);
                });
            }
        }

        showNextRectangle(0);
    });
});

function typeWriter(text, element, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

document.getElementById('iconTopLeft').addEventListener('click', function() {
    var storyBg = document.getElementById('storyBg');
    var storyText = document.getElementById('storyText');
    var blackrectangle = document.getElementById('black-rectangle');
    var scrollcontainer = document.getElementById('scrollcontainer');
    var ellipse = document.getElementById('momentContainer');
    var returnButton = document.getElementById('returnButton');
    var chartdiv = document.getElementById('chartdiv');
    var rightside = document.getElementById('rightside');
    var profilemoments = document.getElementById('profilemoments');
    profilemoments.style.display = 'none'; 
    rightside.style.display = 'none';
    storyBg.style.display = 'block';
    scrollcontainer.style.display = 'block'; 
    rectangleContainer.style.display = 'none';
    statusContainer.style.display = 'none';
    returnButton.style.display = 'flex';
    ellipse.style.display = 'flex';
    storyText.style.display = 'none';
    blackrectangle.style.display = 'none';
    logo.style.display = 'none';
    chartdiv.style.display = 'none';
    
    iconTopLeft.style.display = 'none';
    var Bg = document.getElementById('bg');
        Bg.style.display = 'none';
});

function loadChart(chartType) {
    // Remove existing chart if any
    am5.array.each(am5.registry.rootElements, function(root) {
        if (root.dom.id === "chartdiv") {
            root.dispose();
        }
    });

    // Create root element
    var root = am5.Root.new("chartdiv");

    // Remove amCharts logo
    root._logo.dispose();  // This line will remove the logo

    // Set themes
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Customize colors
    var colors = am5.ColorSet.new(root, {
        colors: [am5.color(0x402904), am5.color(0x402904), am5.color(0x402904), am5.color(0x402904), am5.color(0x402904), am5.color(0x402904)],
        step: 2
    });

    var data = {};

    // Example chart data based on chartType
    if (chartType === '大学') {
        data = {
            value: 0,
            children: [
                {
                    name: "大学",
                    pictureSettings: {
                        src: "assets/images/moment1.png"
                    },
                    children: [
                        {
                            name: "大学",
                            children: [
                                {
                                    name: "Blackberry",
                                    value: 1
                                },
                                {
                                    name: "Raspberry",
                                    value: 1
                                },
                                {
                                    name: "Blueberry",
                                    value: 1
                                },
                                {
                                    name: "Strawberry",
                                    value: 1
                                }
                            ]
                        },
                        {
                            name: "Dried Fruit",
                            children: [
                                {
                                    name: "Raisin",
                                    value: 1
                                },
                                {
                                    name: "Prune",
                                    value: 1
                                }
                            ]
                        },
                        {
                            name: "Other Fruit",
                            children: [
                                {
                                    name: "Coconut",
                                    value: 1
                                },
                                {
                                    name: "Cherry",
                                    value: 1
                                },
                                {
                                    name: "Pomegranate",
                                    value: 1
                                },
                                {
                                    name: "Pineapple",
                                    value: 1
                                },
                                {
                                    name: "Grape",
                                    value: 1
                                },
                                {
                                    name: "Apple",
                                    value: 1
                                },
                                {
                                    name: "Peach",
                                    value: 1
                                },
                                {
                                    name: "Pear",
                                    value: 1
                                }
                            ]
                        },
                        {
                            name: "Citrus Fruit",
                            children: [
                                {
                                    name: "Grapefruit",
                                    value: 1
                                },
                                {
                                    name: "Orange",
                                    value: 1
                                },
                                {
                                    name: "Lemon",
                                    value: 1
                                },
                                {
                                    name: "Lime",
                                    value: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    } else if (chartType === '实习') {
        data = {
            value: 0,
            children: [
                {
                    name: "实习",
                    children: [
                        {
                            name: "Blackberry",
                            value: 1
                        },
                        {
                            name: "Raspberry",
                            value: 1
                        },
                        {
                            name: "Blueberry",
                            value: 1
                        },
                        {
                            name: "Strawberry",
                            value: 1
                        }
                    ]
                }
            ]
        };
    } else if (chartType === '结婚') {
        data = {
            value: 0,
            children: [
                {
                    name: "结婚",
                    children: [
                        {
                            name: "Blackberry",
                            value: 1
                        },
                        {
                            name: "Raspberry",
                            value: 1
                        },
                        {
                            name: "Blueberry",
                            value: 1
                        },
                        {
                            name: "Strawberry",
                            value: 1
                        }
                    ]
                }
            ]
        };
    }

    var zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
            width: am5.p100,
            height: am5.p100,
            wheelable: true,
            pinchZoom: true
        })
    );

    var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
        maskContent: false, // important with zoomable containers
        singleBranchOnly: false,
        downDepth: 2,
        topDepth: 1,
        initialDepth: 3,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithField: "linkWith",
        manyBodyStrength: -15,
        centerStrength: 0.5,
        colors: colors // Set custom colors
    }));

    series.get("colors").setAll({
        step: 2
    });

    series.links.template.set("strength", 0.5);
    series.labels.template.set("minScale", 0);

    series.data.setAll([data]);

    series.set("selectedDataItem", series.dataItems[0]);

    // Customizing nodes to show pictures
    series.nodes.template.setAll({
        tooltipText: "{name}",
        width: 60, // Set initial width
        height: 60, // Set initial height
        scale: 2, // 缩放节点以使其更大
        background: am5.Circle.new(root, {
            fillOpacity: 0
        })
    });

    series.nodes.template.events.on("dataitemvalidated", function(ev) {
        var dataItem = ev.dataItem;
        var nodeContainer = dataItem.get("nodeContainer");
        nodeContainer.removeChildren(); // Clear any existing children
        if (dataItem.dataContext.pictureSettings) {
            var image = am5.Picture.new(root, {
                width: 50,
                height: 50,
                centerX: am5.p50,
                centerY: am5.p50,
                src: dataItem.dataContext.pictureSettings.src
            });
            nodeContainer.children.push(image);
        } else {
            var label = am5.Label.new(root, {
                text: dataItem.dataContext.name,
                centerX: am5.p50,
                centerY: am5.p50
            });
            nodeContainer.children.push(label);
        }
    });

    // Make stuff animate on load
    series.appear(1000, 100);
}



document.querySelectorAll('.scrollable-rectangle').forEach(function(item) {
    item.addEventListener('click', function() {
        var chartdiv = document.getElementById('chartdiv');
        chartdiv.classList.remove('hidden');
        var Bg = document.getElementById('bg');
        Bg.style.display = 'block';
        var rightside = document.getElementById('rightside');
        rightside.style.display = 'block'; // Show rightside content when a rectangle is clicked
        var iconTopLeft = document.getElementById('iconTopLeft');
        iconTopLeft.style.display = 'block';
        var storyText = document.getElementById('storyText');
        var blackrectangle = document.getElementById('black-rectangle');
        var scrollcontainer = document.getElementById('scrollcontainer');
        var ellipse = document.getElementById('momentContainer');
        var returnButton = document.getElementById('returnButton');
        var profilemoments = document.getElementById('profilemoments');
        profilemoments.style.display = 'none'; 
        scrollcontainer.style.display = 'none'; 
        rectangleContainer.style.display = 'none';
        statusContainer.style.display = 'none';
        returnButton.style.display = 'none';
        ellipse.style.display = 'none';
        storyText.style.display = 'none';
        blackrectangle.style.display = 'block';
        logo.style.display = 'none';

        // Hide other elements
        var elementsToHide = ['mainBg', 'storyBg', 'logo', 'rectangleContainer', 'statusContainer', 'scrollcontainer', 'momentContainer', 'storyText', 'black-rectangle'];
        elementsToHide.forEach(function(id) {
            var element = document.getElementById(id);
            if (element) {
                element.classList.add('hidden');
            }
        });

        // Show chartdiv on the left
        chartdiv.style.display = 'block';
        chartdiv.style.position = 'absolute';
        chartdiv.style.left = '9px';
        chartdiv.style.top = '19px';
        chartdiv.style.width = '50%';
        chartdiv.style.height = '90%';

        // Load chart content based on the data-chart attribute
        var chartType = item.getAttribute('data-chart');
        loadChart(chartType);
    });
});
// 更新profilePicture的点击事件
document.getElementById('profilePicture').addEventListener('click', function() {
    var elementsToHide = ['mainBg', 'storyBg', 'logo', 'rectangleContainer', 'statusContainer', 'scrollcontainer', 'momentContainer', 'storyText', 'black-rectangle', 'rightside', 'chartdiv', 'iconTopLeft'];
    elementsToHide.forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
        }
    });
    var bg = document.getElementById('bg');
    var storyBg = document.getElementById('storyBg');
    var profilereturnButton = document.getElementById('profilereturnButton');
    var humanImage = document.getElementById('humanImage');
    var profilePicture = document.getElementById('profilePicture');
    var profilemoments = document.getElementById('profilemoments');
    var circleImage = document.getElementById('circleImage');
    var profileIcons = document.querySelectorAll('.profile-icon');
    var centerTags = document.getElementById('centerTags');
    var centerText = document.getElementById('centerText');
    
    centerText.style.display = 'flex';
    circleImage.style.display = 'flex';
    humanImage.style.display = 'flex';
    profilereturnButton.style.display = 'flex';
    profilemoments.style.display = 'flex';
    storyBg.style.display = 'none';
    profilePicture.style.display = 'none';
    bg.classList.remove('hidden');
    storyBg.classList.remove('hidden');
    rectangleContainer.style.display = 'none';
    statusContainer.style.display = 'flex';
    logo.style.display = 'none';
    var profilebg = document.getElementById('profilebg');
    profilebg.style.display = 'block';

    // 显示所有图标
    profileIcons.forEach(function(icon) {
        icon.style.display = 'flex';
    });

    // 默认放大profile1并显示其标签
    document.getElementById('profile1').classList.add('active');
    centerText.innerText = '意志:156';
    updateTags(tags); // 显示默认的意志标签
    centerTags.style.display = 'flex';
});


// 更新returnButton的点击事件
document.getElementById('profilereturnButton').addEventListener('click', function() {
    var storyBg = document.getElementById('storyBg');
    var storyText = document.getElementById('storyText');
    var blackrectangle = document.getElementById('black-rectangle');
    var scrollcontainer = document.getElementById('scrollcontainer');
    var ellipse = document.getElementById('momentContainer');
    var profilereturnButton = document.getElementById('profilereturnButton');
    var chartdiv = document.getElementById('chartdiv');
    var rightside = document.getElementById('rightside');
    var profilebg = document.getElementById('profilebg');
    var Bg = document.getElementById('bg');
    var humanImage = document.getElementById('humanImage');
    var profilemoments = document.getElementById('profilemoments');
    var circleImage = document.getElementById('circleImage');
    var profileIcons = document.querySelectorAll('.profile-icon');
    var centerTags = document.getElementById('centerTags');
    var centerText = document.getElementById('centerText');

    centerText.style.display = 'none';
    circleImage.style.display = 'none';
    profilemoments.style.display = 'none'; 
    Bg.style.display = 'none';
    profilebg.style.display = 'none';
    rightside.style.display = 'none';
    storyText.style.display = 'flex';
    storyBg.style.display = 'flex';
    scrollcontainer.style.display = 'none'; 
    humanImage.style.display = 'none'; 
    rectangleContainer.style.display = 'flex';
    statusContainer.style.display = 'flex';
    profilePicture.style.display = 'flex';
    profilereturnButton.style.display = 'none';
    ellipse.style.display = 'none';
    storyText.style.display = 'block';
    blackrectangle.style.display = 'block';
    logo.style.display = 'block';
    chartdiv.classList.add('hidden');

    // 隐藏所有图标和标签
    profileIcons.forEach(function(icon) {
        icon.style.display = 'none';
    });
    centerTags.style.display = 'none';
});
// 修改标签数据
var tags = [
    { text: '领导力', icon: 'assets/images/icon01.png' },
    { text: '慷慨', icon: 'assets/images/icon02.png' },
    { text: '狡猾', icon: 'assets/images/icon03.png' },
    { text: '冒险', icon: 'assets/images/icon04.png' },
    { text: '怀疑', icon: 'assets/images/icon05.png' },
];

// 更新标签内容的函数
function updateTags(shuffledTags) {
    shuffledTags.forEach(function(tag, index) {
        var tagElement = document.getElementById(`tag${index + 1}`);
        var tagIcon = tagElement.querySelector('.tag-icon');
        var tagText = tagElement.querySelector('.tag-text');

        tagIcon.style.backgroundImage = `url('${tag.icon}')`;
        tagText.innerText = tag.text;
    });
}
// 添加鼠标悬停事件到每个图标
document.querySelectorAll('.profile-icon').forEach(function(icon) {
    icon.addEventListener('mouseenter', function() {
        document.querySelectorAll('.profile-icon').forEach(function(icon) {
            icon.classList.remove('active');
        });
        icon.classList.add('active');

        // 更新中心文字
        var centerText = document.getElementById('centerText');
        switch (icon.id) {
            case 'profile1':
                centerText.innerText = '意志:156';
                break;
            case 'profile2':
                centerText.innerText = '魅力:183';
                break;
            case 'profile3':
                centerText.innerText = '体力:183';
                break;
            case 'profile4':
                centerText.innerText = '智力:123';
                break;
            case 'profile5':
                centerText.innerText = '敏捷:129';
                break;
            case 'profile6':
                centerText.innerText = '感知:293';
                break;
        }

        // 随机分配标签
        var shuffledTags = tags.sort(() => 0.5 - Math.random());
        updateTags(shuffledTags);

        // 显示标签
        document.getElementById('centerTags').style.display = 'flex';
    });
});

document.querySelector('#coinIcon').addEventListener('click', toggleDisplay);
document.querySelector('#coinIcon + span').addEventListener('click', toggleDisplay);

function toggleDisplay() {
    var elementsToHide = ['mainBg', 'storyBg', 'logo', 'scrollcontainer', 'momentContainer', 'storyText', 'black-rectangle', 'profilebg', 'iconTopLeft', 'rightside', 'profilemoments', 'chartdiv', 'profilePicture'];
    elementsToHide.forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
        }
    });

    var elementsToDisplayNone = ['rectangleContainer', 'statusContainer'];
    elementsToDisplayNone.forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });

    var Bg = document.getElementById('bg');
    var frame = document.querySelector('.frame');
    var walletImage = document.getElementById('walletImage');
    var walletContent = document.getElementById('walletContent');
    var verticalLine = document.getElementById('verticalLine');
    var backButton = document.getElementById('backButton');
    var nfttitle =  document.getElementById('nfttitle');
    var nftImagesContainer = document.querySelector('.nft-images-container');
    var nftimage =  document.getElementById('nftimage');

    nftimage.style.display = 'block';
    nfttitle.style.display = 'block';
    Bg.style.display = 'block';
    frame.style.display = 'block';
    walletImage.style.display = 'block'; // Show the wallet image
    walletContent.style.display = 'block'; // Show the wallet content
    verticalLine.style.display = 'block'; // Show the vertical line
    backButton.style.display = 'block'; // Show the vertical line
    logo.style.display = 'none';
    nftImagesContainer.style.display = 'block';
}
document.getElementById('backButton').addEventListener('click', function() {
    var storyBg = document.getElementById('storyBg');
    var storyText = document.getElementById('storyText');
    var blackrectangle = document.getElementById('black-rectangle');
    var scrollcontainer = document.getElementById('scrollcontainer');
    var ellipse = document.getElementById('momentContainer');
    var returnButton = document.getElementById('returnButton');
    var chartdiv = document.getElementById('chartdiv');
    var rightside = document.getElementById('rightside');
    var profilePicture = document.getElementById('profilePicture');
    var profilemoments = document.getElementById('profilemoments');
    var walletImage = document.getElementById('walletImage');
    var walletContent = document.getElementById('walletContent');
    var verticalLine = document.getElementById('verticalLine');
    var Bg = document.getElementById('bg');
    var backButton = document.getElementById('backButton');
    var nfttitle =  document.getElementById('nfttitle');
    var nftimage =  document.getElementById('nftimage');

    nftimage.style.display = 'none';
    nfttitle.style.display = 'none';
    Bg.style.display = 'none';
    profilemoments.style.display = 'none'; 
    rightside.style.display = 'none';
    backButton.style.display = 'none';
    profilePicture.style.display = 'flex';
    scrollcontainer.style.display = 'none'; 
    rectangleContainer.style.display = 'flex';
    storyBg.style.display = 'flex';
    statusContainer.style.display = 'flex';
    returnButton.style.display = 'none';
    ellipse.style.display = 'none';
    storyText.style.display = 'block';
    blackrectangle.style.display = 'block';
    logo.style.display = 'block';
    chartdiv.classList.add('hidden');
       // Hide current wallet view elements
       walletImage.style.display = 'none';
       walletContent.style.display = 'none';
       verticalLine.style.display = 'none';
   
});
