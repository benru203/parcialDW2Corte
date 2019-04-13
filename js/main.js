/**
 * preguntas de la prueba
 */
let preguntas = [
    {
        pregunta:'Si tuviera la posibilidad de elegir un curso, de que tipo elegiría:',
        respuestas:[
            {
                opcion:'Artístico',
                peso: 10
            },
            {
                opcion:'Deportivo',
                peso: 10
            },
            {
                opcion:'Social',
                peso: 10
            },
            {
                opcion:'Nunguno',
                peso: 1
            }
        ]
    },
    {
        pregunta:'Cercano al cumplimiento de una fecha de entrega que situación lo describe mejor a Ud:',
        respuestas:[
            {
                opcion:'Relajarse y no hacer nada ',
                peso: 2
            },
            {
                opcion:'Trabajar hasta cumplir el objetivo ',
                peso: 8
            },
            {
                opcion:'No puedo trabajar por el stress',
                peso: 5
            },
            {
                opcion:'Prefiero terminar antes de tiempo',
                peso: 1
            }
        ]
    },
    {
        pregunta:'Con qué frecuencia consume bebidas alcohólicas:',
        respuestas:[
            {
                opcion:'1 vez por semana',
                peso: 10
            },
            {
                opcion:'2 veces por semana',
                peso: 8
            },
            {
                opcion:'3 veces por semana',
                peso: 5
            },
            {
                opcion:'más de 3 veces por semana',
                peso: 1
            }
        ]
    },
    {
        pregunta:'Que deporte practica con mayor regularidad:',
        respuestas:[
            {
                opcion:'Futbol',
                peso: 10
            },
            {
                opcion:'Baloncesto',
                peso: 10
            },
            {
                opcion:'Otro',
                peso: 8
            },
            {
                opcion:'No practico ningún deporte',
                peso: 1
            }
        ]
    },
    {
        pregunta:'En un equipo de trabajo con que rol se siente más a gusto:',
        respuestas:[
            {
                opcion:'Líder',
                peso: 10
            },
            {
                opcion:'Ejecutor',
                peso: 8
            },
            {
                opcion:'Apoyo',
                peso: 8
            },
            {
                opcion:'No quiere trabajar',
                peso: 0
            }
        ]
    },
    {
        pregunta:'En que tipo de vivienda reside actualmente:',
        respuestas:[
            {
                opcion:'Propia',
                peso: 10
            },
            {
                opcion:'Arrendada',
                peso: 8
            },
            {
                opcion:'Familiar',
                peso: 3
            },
            {
                opcion:'Otro',
                peso: 2
            }
        ]
    },
    {
        pregunta:'Cuantas personas habitan en su residencia:',
        respuestas:[
            {
                opcion:'De 1 a 2',
                peso: 10
            },
            {
                opcion:'De 2 a 4',
                peso: 8
            },
            {
                opcion:'De 5 a 7',
                peso: 5
            },
            {
                opcion:'>7',
                peso: 1
            }
        ]
    }
]
/**
 * array de cargos
 */
let cargos = [
    {
        cargo: 'Operario',
        pm: 55,
    },
    {
        cargo: 'Supervisor',
        pm: 65,
    }
    ,
    {
        cargo: 'Auxiliar',
        pm: 50,
    },
    {
        cargo: 'Director',
        pm: 70,
    }
]

/**
 * funcion para llenar las respuestas de las preguntas
 */
function respuestas(elements,i){
    let aux = ''
    elements.forEach((element,index)=>{
        aux += ' <div class="form-check"> ' +
        '     <input class="form-check-input pregunta'+ i+'" type="radio" name="pregunta'+ i +'" value="'+element.peso+'"> ' +
        '     <label class="form-check-label" for="exampleRadios1"> ' + element.opcion  +' </label> ' +
        ' </div> ';
    });
    return aux;
}

/**
 * function validador de campos
 */
function validator(element, validator){
    let arrayValidator = validator.split("|");
    for (let index = 0; index < arrayValidator.length; index++) {
        if(arrayValidator[index] == 'required'){
            return (element.value.length == 0)?false:true;
        }
        if(arrayValidator[index].indexOf("min") != -1){
            let pos = arrayValidator[index].indexOf(":");
            let num = parseInt(arrayValidator[index].substring(pos+1));
            return (element.value.length == num)?false:true;        
        }
        if(arrayValidator[index].indexOf("max") != -1){
            let pos = arrayValidator[index].indexOf(":");
            let num = parseInt(arrayValidator[index].substring(pos+1));
            return (element.value.length == num)?false:true;        
        }
        if(arrayValidator[index] == 'email'){
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
    return true;
}

 /**
     * Limpia todos las etiquetas small de manejo de errores del formulario de Datos del empleado
     */
function limpiarSmall(){   
    let small = document.querySelectorAll('small');
    small.forEach((element,index)=>{
        element.style.display = 'none';
    });
}
let encuestas = [];

window.onload = ()=>{
     limpiarSmall()
    /**
     * carga los cargos en el select
     */
    let contentcargos = document.getElementById('cargo');
    let scargos  = contentcargos.querySelector('select');
    let auxcargos ='<option value="">Seleccione su cargo</option>';
    cargos.forEach((element,index)=>{
        auxcargos += '<option value="'+element.pm+'">'+ element.cargo+'</option>';
    });
    scargos.innerHTML = auxcargos;

    /**
     * carga las preguntas en el DOM
     */
    let contentpreguntas = document.getElementById('preguntas');
    let auxpreguntas = '';
    preguntas.forEach((element,index)=>{
        auxpreguntas+= '<div class="col-12 mb1">  ' +
       ' <label>'+ (index+1) +') '+ element.pregunta +'</label> ' +
        respuestas(element.respuestas,index) + '</div> '
    });
    contentpreguntas.innerHTML = auxpreguntas;

    /**
     * click del boton guardar
     */
    let btnGuardar = document.querySelector('button');
    btnGuardar.addEventListener('click',(event)=>{
        event.preventDefault;
        let id = document.getElementById('ID');
        let error =  id.querySelector('small');
        let globalError = true;
        if (!validator(id.querySelector('input'),'required')){
            error.style.display = 'block';
            globalError = false;
        }else{
            error.style.display = 'none';
        }
        let name = document.getElementById('nombre');
        error =  name.querySelector('small');
        if (!validator(name.querySelector('input'),'required')){
            error.style.display = 'block';
            globalError = false;
        }else{
            error.style.display = 'none';
        }
        let email = document.getElementById('email');
        error =  email.querySelector('small');
        if (!validator(email.querySelector('input'),'required')){
            error.style.display = 'block';
            globalError = false;
        }else{
            error.style.display = 'none';
        }
        let fn = document.getElementById('fn');
        error =  fn.querySelector('small');
        if (!validator(fn.querySelector('input'),'required')){
            error.style.display = 'block';
            globalError = false;
        }else{
            error.style.display = 'none';
        }
        let car = document.getElementById('cargo');
        error =  car.querySelector('small');
        if (!validator(car.querySelector('select'),'required')){
            error.style.display = 'block';
            globalError = false;
        }else{
            error.style.display = 'none';
        }
        let respuestas = [];
        
        preguntas.forEach((element,index)=>{ 
            let query = '.pregunta'+index;
            let pre = document.querySelectorAll(query);
            console.log(pre);
            pre.forEach((el,i)=>{  
                console.log();         
                if(el.checked){
                    respuestas.push({pregunta:index,respuestas:element.respuestas[i]});
                }
            });        
        });
       if(respuestas.length<=preguntas.length){
           alert('error faltaron algunas respuestas')
       }
        
    });
}