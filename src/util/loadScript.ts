export default function loadScript(url, callback){
    
    const script : any = document.createElement('script');
    script.type = 'text/javascript';

    if(script.readyState){ // IE
        script.onreadystatechange = () => {
            if(script.readyState == 'loaded' || script.readyState == 'complete'){
                script.onreadystatechange = null;
                
                callback();
                
            }
        };
    } else script.onload = () => callback();

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}