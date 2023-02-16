// https://teachablemachine.withgoogle.com/models/vhUxtGtda/
// FELIZ TRISTE E RAIVA
prediction1=""//vamos guardar a previsão e colocmos as aspas para informar que é texto
prediction2=""//vamos guardar a previsão e colocmos as aspas para informar que é texto
camera=document.getElementById("camera");//esse guarda a camera
Webcam.set({//imagem ao vivo e configurar a camera
    width:360,//largura da camera
    heigth:250,//altura da cmer 
    image_format:"jpeg",//formato da camera 
    jpeg_quality:90//qualidade da camera
});
Webcam.attach( '#camera' );//paraa pedir permissão

function takeSnapshot(){//função que tira foto 
    Webcam.snap(function(data_uri) {//tira a  foto
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';// vai mostrar a divisão no result  
    });
}
console.log ("ml5 version:",ml5.version);//ele mostra a versão do machine learning no console


// importar o modelo
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/vhUxtGtda/model.json',modelLoaded);//cola o model e depois escreve model.json

function modelLoaded (){
    console.log ("modelo carregado");//ela mostra o modelo carregado no console
}
function speak(){
    var synth=window.speechSynthesis;//carregamos o api que fala
    speakData1="a primeira previsão é "+prediction1;//gardamos a previsão um
    speakData2="a segunda previsão é "+prediction2;//gardamos a previsão dois 
    var utterThis= new SpeechSynthesisUtterance(speakData1 + speakData2);//criamos o novo ser que fala as duas coisas
    synth.speak(utterThis);//fz com que ele fale
    

}
function check () {
    img= document.getElementById("captured_image");
    classifier.classify(img,gotResult);


}
function gotResult (error,results){
    if (error) {
        console.error(error);

    } else {
        console.log (results);
        document.getElementById("resultEmotionName").innerHTML =results[0].label;
        document.getElementById("resultEmotionName2").innerHTML =results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak ();
        if (results[0].label=="FELIZ") {
            document.getElementById("updateEmoji").innerHTML= "&#129325;";     
        }
        if (results[0].label=="TRISTE") {
            document.getElementById("updateEmoji").innerHTML= "&#128546;";     
        }
        if (results[0].label=="RAIVA") {
            document.getElementById("updateEmoji").innerHTML= "&#128545;";     
        }
        if (results[1].label=="FELIZ") {
            document.getElementById("updateEmoji2").innerHTML= "&#129325;";     
        }
        if (results[1].label=="TRISTE") {
            document.getElementById("updateEmoji2").innerHTML= "&#128546;";     
        }
        if (results[1].label=="RAIVA") {
            document.getElementById("updateEmoji2").innerHTML= "&#128545;";     
        }
    }
}
