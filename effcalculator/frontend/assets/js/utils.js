    function createDownloadLink(data,filename,componentId){
        let a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = filename;
        a.innerHTML = 'Export';
        a.class = 'btn'
        let container = document.getElementById(componentId);
        container.appendChild(a);
    }
    function closest(array, num) {
        let i = 0;
        let minDiff = 1000;
        let ans;
        for (i in array) {
            let m = Math.abs(num - array[i]);
            if (m < minDiff) {
                minDiff = m;
                ans = array[i];
            }
        }
        return ans;
    }

export {createDownloadLink, closest}