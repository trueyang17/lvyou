module.exports = {
    sum:function (...arg) {
        let total = null;
        let args = Array.from(arguments)
        console.log(args);
        args.forEach(element => {
            total += element
        });
        return total
    }
}


