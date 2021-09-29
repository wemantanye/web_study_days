function animate(obj, target, callback) {  // 三个行参数，obj 目标对象 target 目标位置 callback 回调函数，添加了回调函数
    // 当我们不断点击按钮，这个元素的运行速度会越来越快，因为会一直开启定时器
    // 解决方法就是 让我们元素只有一个定时器在执行，所以在函数执行开始就先清除定时器
    // 缓动动画的原理：
    // 让盒子移动的距离慢慢变下，速度就会慢慢变小
    // 核心算法: (目标值 - 现在的位置) / 10 作为每次移动距离的步长
    // 停止的条件是： 让当前盒子位置等于目标位置就停止定时器
    clearInterval(obj.timer);
    // 定义一个定时器不断重复操作
    obj.timer = setInterval(function () {
        // 步长值写在定时器的里面
        // 因为在除以10的过程中会有小数，这就会导致步长有问题，所以我们要通过数学函数取整
        var step = (target - obj.offsetLeft) / 10;
        // 通过三元表达式，而如果是正的的补偿，那就往大了取整,如果是负的步长，比如在回调时候就取小整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 在外设置一个变量timer，这样可以通过clearInterval方法停止定时
            clearInterval(obj.timer);
            // 定时器一结束判断有没有回调函数
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + "px"; // 获取当前位置并加像素
    }, 15);
};