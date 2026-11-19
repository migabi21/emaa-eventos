/*==================================================
=               CENTRO DE AYUDA
==================================================*/

/**
 * Muestra el contenido de la categoría seleccionada
 * dentro del Centro de Ayuda.
 *
 * @param {string} categoria Nombre de la categoría.
 */

/**
 * Activa el comportamiento de las preguntas frecuentes
 * (FAQ) para mostrar u ocultar sus respuestas.
 */

let categoriaActiva = null;

function mostrarCategoria(categoria){

    const contenido = document.getElementById("contenidoCategoria");
    const seccion = document.querySelector(".contenido-ayuda");

    if (categoriaActiva === categoria && seccion.style.display === "block") {
        seccion.style.display = "none";
        contenido.innerHTML = "";
        categoriaActiva = null;
        return;
    }

    seccion.style.display = "block";
    categoriaActiva = categoria;
    seccion.scrollIntoView({ behavior: "smooth", block: "start" });

    const contenidos = {
        comprar: {
            titulo: "¿Cómo comprar?",
            preguntas: [
                ["¿Cómo hago un pedido?", "Explora Productos, elige una opción y pulsa Agregar al carrito. Luego revisa los productos, las cantidades y el total en Mi carrito."],
                ["¿Cómo finalizo mi compra?", "Desde Mi carrito puedes seleccionar Finalizar compra. El proyecto registra el pedido y, si tienes una cuenta, calcula los puntos correspondientes."],
                ["¿Puedo pagar por WhatsApp?", "Sí. Selecciona Pagar por WhatsApp en el carrito. EMAA abrirá una conversación con el detalle del pedido, las cantidades y el total para continuar la atención."],
                ["¿Cómo solicito una cotización?", "Usa la opción Cotiza tu evento y completa nombre, celular, correo, tipo de evento, cantidad de personas, fecha e información adicional."],
                ["¿Puedo personalizar una tabla?", "Sí. Las tablas y pasabocas pueden adaptarse a celebraciones, eventos y necesidades especiales. Para una propuesta personalizada, solicita una cotización."]
            ]
        },
        pagos: {
            titulo: "Métodos de pago",
            preguntas: [
                ["¿Qué opción de pago ofrece el proyecto?", "El flujo implementado permite continuar el pedido por WhatsApp mediante el botón Pagar por WhatsApp del carrito."],
                ["¿Cómo envío mi pedido por WhatsApp?", "Agrega los productos al carrito, revisa el total y pulsa Pagar por WhatsApp. Se abrirá una conversación con el resumen del pedido."],
                ["¿EMAA recibe pagos directamente en la página?", "Actualmente la página no tiene una pasarela de pago integrada. La confirmación del medio de pago se coordina con el equipo por WhatsApp."],
                ["¿Cómo confirmo el valor de mi pedido?", "El carrito muestra el precio de cada producto, las cantidades y el total antes de enviarlo por WhatsApp."]
            ]
        },
        entregas: {
            titulo: "Tiempos de entrega",
            preguntas: [
                ["¿Cuánto tarda mi pedido?", "El proyecto no establece un tiempo fijo de entrega. El plazo debe confirmarse con EMAA según el producto, la cantidad, la fecha del evento y la disponibilidad."],
                ["¿Cómo coordino la entrega?", "Envía el pedido por WhatsApp y confirma con el equipo la fecha, la hora y los datos necesarios para la entrega."],
                ["¿Puedo pedir para un evento?", "Sí. Para eventos conviene usar Cotiza tu evento e indicar la fecha, el número de personas y la información adicional."],
                ["¿Dónde consulto el horario de atención?", "El horario publicado por EMAA es de lunes a viernes de 9:00 a.m. a 5:00 p.m. y sábados de 8:00 a.m. a 12:00 m."]
            ]
        },
        garantias: {
            titulo: "Garantías y cambios",
            preguntas: [
                ["¿Qué hago si tengo un inconveniente con mi pedido?", "Comunícate con EMAA por WhatsApp, teléfono o correo y describe lo ocurrido con los datos del pedido."],
                ["¿Qué información debo enviar?", "Indica tu nombre, el detalle del pedido, la fecha de entrega y una descripción clara del inconveniente. Si es necesario, adjunta fotografías por WhatsApp."],
                ["¿Cómo se revisan los cambios o garantías?", "El proyecto no publica una política específica de cambios o garantías. El equipo revisará cada caso y te indicará la solución correspondiente."],
                ["¿Puedo reportar un problema por WhatsApp?", "Sí. WhatsApp es el canal disponible para continuar la atención y revisar el pedido directamente con EMAA."]
            ]
        },
        "Términos y condiciones": {
            titulo: "Términos y condiciones",
            secciones: [
                ["1. Información general", `<p>Bienvenido a EMAA Eventos. Estos términos y condiciones regulan el acceso, navegación y uso de nuestro sitio web, así como las condiciones generales relacionadas con la solicitud de cotizaciones y adquisición de nuestros productos y servicios.</p><p>EMAA Eventos es un emprendimiento dedicado a la elaboración, presentación y comercialización de tablas de quesos y productos gastronómicos para celebraciones, reuniones y eventos especiales.</p><p>Al navegar por nuestro sitio web o solicitar una cotización, el usuario acepta las condiciones aquí establecidas.</p>`],
                ["2. Productos y servicios", `<p>EMAA Eventos ofrece productos y servicios relacionados con la preparación y presentación de tablas de quesos y opciones gastronómicas para diferentes ocasiones y eventos.</p><p>Las características, presentaciones, cantidades y precios pueden variar según el producto solicitado, la disponibilidad de ingredientes y los requerimientos particulares de cada cliente.</p><p>Las imágenes publicadas en el sitio web son ilustrativas y pueden presentar pequeñas variaciones respecto al producto final.</p>`],
                ["3. Solicitudes de cotización", `<p>Los usuarios podrán realizar solicitudes de cotización a través del formulario disponible en nuestro sitio web. Para facilitar la atención, se podrán solicitar los siguientes datos:</p><ul><li>Nombre del cliente.</li><li>Número de teléfono.</li><li>Tipo de evento.</li><li>Fecha del evento.</li><li>Número de invitados.</li><li>Descripción o requerimientos adicionales.</li></ul><p>Una vez diligenciado el formulario, la información será enviada a través de WhatsApp para continuar el proceso de atención.</p><p>El envío de una solicitud de cotización no representa una reserva ni confirma automáticamente un pedido.</p>`],
                ["4. Precios y pagos", `<p>Los precios de los productos y servicios serán informados directamente al cliente durante el proceso de cotización. Los valores podrán variar dependiendo de la cantidad de invitados, los productos seleccionados, las características del evento y otros requerimientos especiales.</p><p>Los medios de pago, condiciones de anticipo y demás detalles de la transacción serán comunicados por EMAA Eventos a través de sus canales oficiales de atención.</p>`],
                ["5. Confirmación, cambios y cancelaciones", `<p>El pedido se considerará confirmado una vez que ambas partes hayan acordado las condiciones comerciales y se hayan cumplido los requisitos de confirmación establecidos. Los pedidos estarán sujetos a disponibilidad y confirmación por parte de EMAA Eventos.</p><p>Cualquier modificación relacionada con la fecha, cantidad de invitados, productos o características del pedido deberá ser comunicada con anticipación y estará sujeta a disponibilidad y aprobación. Los cambios podrán generar ajustes en el valor inicialmente cotizado.</p><p>En caso de cancelación de un pedido, el cliente deberá comunicarse directamente con EMAA Eventos a través de WhatsApp para informar su solicitud.</p><p>Las condiciones de cancelación, reprogramación y devolución de dinero dependerán del estado de preparación del pedido, los compromisos adquiridos y las disposiciones legales aplicables.</p><p>EMAA Eventos atenderá las solicitudes de retracto, garantías y devoluciones de conformidad con la legislación colombiana vigente, cuando corresponda.</p>`],
                ["6. Entregas", `<p>Las condiciones de entrega, horarios, ubicación y posibles costos adicionales serán acordados previamente con el cliente. El cliente deberá proporcionar información correcta y completa sobre la dirección y los datos necesarios para realizar la entrega.</p><p>EMAA Eventos procurará cumplir con las condiciones y tiempos previamente acordados.</p>`],
                ["7. Calidad, higiene y seguridad alimentaria", `<p>EMAA Eventos trabaja para ofrecer productos de calidad, preparados y presentados bajo condiciones adecuadas de higiene y manipulación de alimentos.</p><p>Debido a que nuestros productos pueden contener ingredientes perecederos, el cliente deberá seguir las recomendaciones de conservación y consumo que se le proporcionen.</p><p>Es responsabilidad del cliente informar oportunamente sobre alergias, intolerancias alimentarias o restricciones relacionadas con los ingredientes. EMAA Eventos proporcionará información sobre los ingredientes de sus productos cuando sea solicitada.</p>`],
                ["8. Obligaciones del usuario", `<p>El usuario se compromete a:</p><ul><li>Proporcionar información veraz y actualizada.</li><li>Utilizar el sitio web de manera adecuada.</li><li>No realizar solicitudes falsas o fraudulentas.</li><li>Respetar los derechos de propiedad intelectual de EMAA Eventos.</li><li>Verificar las condiciones de su pedido antes de confirmar la compra.</li></ul>`],
                ["9. Propiedad intelectual", `<p>Los contenidos publicados en el sitio web, incluyendo fotografías, imágenes, diseños, textos, logotipos, elementos gráficos y demás materiales, son propiedad de EMAA Eventos o se utilizan con la autorización correspondiente.</p><p>Queda prohibida su reproducción, distribución o utilización comercial sin autorización previa.</p>`],
                ["10. Protección de datos personales", `<p>EMAA Eventos podrá recopilar y utilizar los datos personales proporcionados por los usuarios para gestionar solicitudes de cotización, atender consultas, coordinar pedidos y mantener comunicación relacionada con los productos y servicios.</p><p>El tratamiento de los datos personales se realizará de acuerdo con la legislación colombiana vigente y nuestra Política de Tratamiento de Datos Personales y Política de Privacidad.</p>`],
                ["11. Disponibilidad del sitio web", `<p>EMAA Eventos procurará mantener su sitio web disponible y funcionando correctamente. Sin embargo, no garantiza que el acceso sea permanente e ininterrumpido, debido a posibles mantenimientos, actualizaciones o situaciones técnicas ajenas a su control.</p>`],
                ["12. Modificaciones de estos términos", `<p>EMAA Eventos se reserva el derecho de actualizar o modificar estos términos y condiciones cuando sea necesario.</p><p>Las modificaciones serán publicadas en el sitio web y entrarán en vigencia desde el momento de su publicación, respetando los derechos adquiridos por los consumidores y las disposiciones legales aplicables.</p>`],
                ["13. Legislación aplicable", `<p>Estos términos y condiciones se rigen por las leyes de la República de Colombia, especialmente por las disposiciones aplicables de protección al consumidor, comercio electrónico y protección de datos personales.</p><p>Entre ellas se encuentran la Ley 1480 de 2011 (Estatuto del Consumidor), la Ley 527 de 1999 y la Ley 1581 de 2012, junto con sus normas reglamentarias y las disposiciones que las modifiquen o complementen.</p>`],
                ["14. Contacto", `<p>Si tienes preguntas, inquietudes o solicitudes relacionadas con estos términos y condiciones, puedes comunicarte con EMAA Eventos a través de nuestros canales oficiales:</p><ul><li>Empresa: EMAA Eventos – Tablas de Quesos.</li><li>Canal de atención: WhatsApp.</li><li>Sitio web: [Agregar dominio oficial cuando esté disponible].</li><li>Correo electrónico: emaaeventosmzl@gmail.com.</li></ul><p>Estamos para ayudarte a crear momentos especiales.</p>`]
            ]
        },
          
        "Politica de privacidad": {
            titulo: "Política de Privacidad",
            secciones: [
                ["1. Introducción y marco legal", `<p>En EMAA Eventos estamos comprometidos con la protección de la privacidad y los datos personales de nuestros clientes, usuarios y visitantes.</p><p>Esta Política de Privacidad establece cómo recopilamos, utilizamos, almacenamos, protegemos y tratamos la información personal que los usuarios proporcionan al navegar por nuestro sitio web, solicitar cotizaciones o comunicarse con nosotros a través de nuestros canales de atención.</p><p>El tratamiento de los datos personales se realizará de acuerdo con la legislación colombiana vigente, especialmente la Ley 1581 de 2012, el Decreto 1074 de 2015 y demás normas que las complementen o modifiquen.</p>`],
                ["2. Responsable del tratamiento", `<p>El responsable del tratamiento de los datos personales es:</p><ul><li>Nombre comercial: EMAA Eventos – Tablas de Quesos.</li><li>Razón social: Emprendimiento en proceso de constitución.</li><li>NIT: 	Pendiente de formalización.</li><li>Domicilio: Colombia.</li><li>Ciudad: Manizales, Caldas.</li><li>Correo electrónico: emaaeventosmzl@gmail.com.</li><li>Teléfono / WhatsApp: +573246501091.</li></ul><p>En adelante, cuando se mencione EMAA Eventos, se hará referencia al responsable del tratamiento de los datos personales.</p>`],
                ["3. Datos personales que recopilamos", `<p>EMAA Eventos podrá recopilar los siguientes datos personales cuando los usuarios utilicen nuestro sitio web o soliciten información sobre nuestros productos y servicios:</p><ul><li>Nombre y apellidos.</li><li>Número de teléfono o contacto.</li><li>Información relacionada con el tipo de evento.</li><li>Fecha de realización del evento.</li><li>Número aproximado de invitados.</li><li>Información adicional proporcionada voluntariamente por el usuario.</li></ul><p>También podremos recibir información cuando el cliente se comunique directamente con nosotros a través de WhatsApp u otros canales oficiales.</p><p>EMAA Eventos únicamente solicitará los datos necesarios para atender las solicitudes y prestar sus servicios.</p>`],
                ["4. Finalidades del tratamiento", `<p>Los datos personales recopilados serán utilizados para:</p><ol><li>Atender solicitudes de información y cotizaciones.</li><li>Contactar a los clientes para brindar asesoría comercial.</li><li>Elaborar cotizaciones personalizadas.</li><li>Coordinar pedidos, entregas y servicios para eventos.</li><li>Confirmar fechas, cantidades y características de los pedidos.</li><li>Mantener comunicación relacionada con los productos y servicios solicitados.</li><li>Gestionar solicitudes, preguntas, sugerencias, quejas y reclamos.</li><li>Cumplir obligaciones legales y comerciales aplicables.</li><li>Mejorar la experiencia de navegación y atención al cliente.</li></ol><p>El envío de información comercial, promociones o publicidad se realizará únicamente cuando exista la autorización correspondiente del titular.</p>`],
                ["5. Atención por WhatsApp", `<p>EMAA Eventos utiliza WhatsApp como canal de comunicación para facilitar la atención de los clientes.</p><p>Cuando un usuario diligencia el formulario de cotización de nuestro sitio web, podrá ser dirigido a WhatsApp con un mensaje previamente elaborado que contiene la información suministrada. El usuario podrá revisar el mensaje antes de enviarlo.</p><p>Una vez enviado, los datos serán recibidos y utilizados por EMAA Eventos para atender la solicitud y continuar el proceso comercial.</p><p>WhatsApp es una plataforma de terceros que cuenta con sus propias políticas de privacidad y tratamiento de información. Por esta razón, recomendamos a los usuarios consultar sus condiciones de uso y privacidad.</p>`],
                ["6. Seguridad y conservación de la información", `<p>EMAA Eventos adopta medidas razonables de seguridad administrativas y técnicas para proteger los datos personales contra pérdida, acceso no autorizado, alteración, divulgación o uso indebido.</p><p>La información será tratada únicamente por las personas autorizadas y para las finalidades establecidas en esta política.</p><p>Los datos personales se conservarán durante el tiempo necesario para cumplir las finalidades para las cuales fueron recopilados y los periodos exigidos por las obligaciones legales aplicables.</p>`],
                ["7. Derechos de los titulares", `<p>De acuerdo con la legislación colombiana, los usuarios tienen derecho a:</p><ul><li>Conocer los datos personales que EMAA Eventos tiene sobre ellos.</li><li>Actualizar y corregir información incompleta, inexacta o desactualizada.</li><li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li><li>Conocer el uso que se ha dado a su información personal.</li><li>Solicitar la supresión de sus datos cuando sea procedente.</li><li>Revocar la autorización de tratamiento cuando sea legalmente procedente.</li><li>Presentar consultas, solicitudes y reclamos relacionados con sus datos personales.</li><li>Acudir ante la Superintendencia de Industria y Comercio cuando consideren que sus derechos han sido vulnerados, una vez agotado el trámite de consulta o reclamo ante el responsable, cuando corresponda.</li></ul><p>Los usuarios podrán ejercer sus derechos enviando una solicitud a través del correo electrónico o WhatsApp oficial de EMAA Eventos.</p>`],
                ["8. Consultas y reclamos", `<p>La solicitud deberá incluir:</p><ul><li>Nombre completo del titular.</li><li>Número de identificación, cuando sea necesario para verificar su identidad.</li><li>Descripción de la solicitud o reclamo.</li><li>Información de contacto para recibir respuesta.</li></ul><p>EMAA Eventos atenderá las consultas y reclamos dentro de los plazos establecidos en la legislación colombiana vigente.</p><p>Las consultas serán atendidas en un plazo máximo de diez (10) días hábiles y los reclamos en un plazo máximo de quince (15) días hábiles, con las posibilidades de ampliación previstas legalmente.</p>`],
                ["9. Cookies y tecnologías similares", `<p>Nuestro sitio web podrá utilizar cookies o tecnologías similares para mejorar la navegación, facilitar el funcionamiento de sus servicios y conocer aspectos generales de la interacción de los usuarios con la página.</p><p>Cuando se utilicen estas tecnologías, EMAA Eventos informará sobre su finalidad y permitirá gestionar las preferencias correspondientes cuando sea aplicable.</p>`],
                ["10. Datos de menores de edad", `<p>EMAA Eventos no solicita intencionalmente datos personales de menores de edad para sus procesos comerciales.</p><p>En caso de que sea necesario tratar información de menores, se respetarán las disposiciones legales aplicables y se garantizará la protección de sus derechos fundamentales, incluyendo la autorización correspondiente de sus representantes legales cuando sea exigible.</p>`],
                ["11. Cambios y vigencia de esta política", `<p>EMAA Eventos podrá actualizar esta Política de Privacidad cuando existan cambios en sus procesos, servicios o disposiciones legales. Las modificaciones serán publicadas en nuestro sitio web para que los usuarios puedan conocerlas.</p><p>La presente Política de Privacidad entra en vigencia a partir de su publicación en el sitio web de EMAA Eventos y permanecerá vigente mientras se realice el tratamiento de datos personales conforme a las finalidades aquí descritas.</p>`],
                ["12. Contacto", `<p>Para cualquier inquietud relacionada con el tratamiento de datos personales, puedes comunicarte con nosotros a través de los siguientes canales:</p><ul><li>Empresa: EMAA Eventos – Tablas de Quesos.</li><li>Canal de atención: WhatsApp.</li><li>Sitio web: [Agregar dominio oficial cuando esté disponible].</li><li>Correo electrónico: emaaeventosmzl@gmail.com.</li></ul></li>En EMAA Eventos valoramos tu confianza y trabajamos para proteger tu información personal.</p>`]
            ]
        },
        "Politica de datos personales": {
            titulo: "Política de Tratamiento de Datos Personales",
            secciones: [
                ["1. Presentación", `<p>EMAA Eventos, en cumplimiento de las disposiciones legales colombianas sobre protección de datos personales, establece la presente Política de Tratamiento de Datos Personales para garantizar el adecuado manejo, protección y confidencialidad de la información suministrada por sus clientes, usuarios y visitantes.</p>`],
                ["2. Responsable del tratamiento", `<p>El responsable del tratamiento de los datos personales es:</p><ul><li>Nombre comercial: EMAA Eventos – Tablas de Quesos.</li><li>Razón social: Emprendimiento en proceso de constitución.</li><li>NIT: 	Pendiente de formalización.</li><li>Domicilio: Colombia.</li><li>Ciudad: Manizales, Caldas.</li><li>Correo electrónico: emaaeventosmzl@gmail.com.</li><li>Teléfono / WhatsApp: +573246501091.</li></ul><p>En adelante, cuando se mencione EMAA Eventos, se hará referencia al responsable del tratamiento de los datos personales.</p>`],
                ["3. Marco legal", `<p>La presente política se encuentra fundamentada en las siguientes disposiciones:</p><ul><li>Constitución Política de Colombia, artículo 15.</li><li>Ley 1581 de 2012, régimen general de protección de datos personales.</li><li>Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015.</li><li>Decreto 1074 de 2015, reglamentación sobre protección de datos personales.</li><li>Demás normas que modifiquen, complementen o sustituyan las anteriores.</li></ul>`],
                ["4. Definiciones", `<ul><li><strong>Dato personal:</strong> Información que permite identificar o hacer identificable a una persona natural.</li><li><strong>Titular:</strong> Persona natural cuyos datos personales son objeto de tratamiento.</li><li><strong>Tratamiento:</strong> Cualquier operación realizada sobre datos personales, como recolección, almacenamiento, uso, circulación o supresión.</li><li><strong>Responsable del tratamiento:</strong> Persona natural o jurídica que decide sobre la finalidad y los medios del tratamiento de los datos personales.</li><li><strong>Encargado del tratamiento:</strong> Persona natural o jurídica que realiza el tratamiento de datos personales por cuenta del responsable.</li><li><strong>Autorización:</strong> Consentimiento previo, expreso e informado otorgado por el titular para realizar el tratamiento de sus datos personales, cuando sea exigible.</li><li><strong>Base de datos:</strong> Conjunto organizado de datos personales que sea objeto de tratamiento.</li></ul>`],
                ["5. Principios para el tratamiento", `<p>EMAA Eventos aplicará los siguientes principios:</p><ul><li><strong>Legalidad:</strong> El tratamiento se realizará conforme a las disposiciones legales vigentes.</li><li><strong>Finalidad:</strong> La información será utilizada para propósitos legítimos e informados al titular.</li><li><strong>Libertad:</strong> El tratamiento se realizará con autorización previa, expresa e informada, salvo las excepciones legales.</li><li><strong>Veracidad:</strong> Los datos deberán ser completos, exactos, actualizados y comprensibles.</li><li><strong>Transparencia:</strong> Se garantizará al titular el derecho a conocer la información relacionada con el tratamiento de sus datos.</li><li><strong>Acceso y circulación restringida:</strong> La información solo será accesible para las personas autorizadas.</li><li><strong>Seguridad:</strong> Se implementarán medidas para proteger la información contra pérdida, adulteración y acceso no autorizado.</li><li><strong>Confidencialidad:</strong> Las personas autorizadas deberán mantener la reserva de la información personal.</li></ul>`],
                ["6. Datos personales recopilados", `<p>EMAA Eventos podrá recopilar y tratar los siguientes datos:</p><p><strong>Datos de identificación y contacto:</strong></p><ul><li>Nombre y apellidos.</li><li>Número de teléfono.</li><li>Correo electrónico, cuando sea suministrado.</li><li>Información necesaria para la comunicación con el cliente.</li></ul><p><strong>Datos relacionados con solicitudes y pedidos:</strong></p><ul><li>Tipo de evento.</li><li>Fecha del evento.</li><li>Número de invitados.</li><li>Descripción de los productos o servicios solicitados.</li><li>Información necesaria para coordinar entregas y pedidos.</li></ul><p>EMAA Eventos procurará recopilar únicamente los datos necesarios para cumplir con sus actividades comerciales. No se solicitarán datos personales sensibles como requisito para realizar una cotización o adquirir productos.</p>`],
                ["7. Finalidades del tratamiento", `<p>Los datos personales serán tratados para las siguientes finalidades:</p><ol><li>Atender solicitudes de información y cotizaciones.</li><li>Contactar a los usuarios mediante WhatsApp, llamadas telefónicas o correo electrónico.</li><li>Elaborar propuestas comerciales personalizadas.</li><li>Gestionar y confirmar pedidos.</li><li>Coordinar la preparación y entrega de productos.</li><li>Informar sobre características, disponibilidad y precios.</li><li>Atender consultas, solicitudes, quejas y reclamos.</li><li>Mantener registros de las relaciones comerciales.</li><li>Cumplir obligaciones legales, contables y comerciales.</li><li>Mejorar la calidad de los productos y la atención al cliente.</li></ol><p>El envío de publicidad, promociones y comunicaciones comerciales no relacionadas directamente con una solicitud deberá contar con la autorización correspondiente del titular.</p>`],
                ["8. Autorización del titular", `<p>EMAA Eventos solicitará autorización previa, expresa e informada a los titulares para realizar el tratamiento de sus datos personales, excepto en los casos expresamente establecidos por la ley.</p><p>La autorización podrá obtenerse mediante mecanismos físicos, electrónicos o cualquier otro medio que permita conservar prueba del consentimiento otorgado.</p><p>En el sitio web de EMAA Eventos, el formulario de cotización podrá incluir una casilla de aceptación mediante la cual el usuario autorice el tratamiento de sus datos personales. EMAA Eventos conservará la evidencia de las autorizaciones otorgadas.</p>`],
                ["9. Uso de WhatsApp", `<p>EMAA Eventos utiliza WhatsApp como canal de comunicación comercial y atención al cliente. Cuando un usuario diligencie el formulario de cotización, podrá generar un mensaje con sus datos y la información del evento para enviarlo a través de WhatsApp.</p><p>Esta información será utilizada para atender la solicitud, preparar cotizaciones y coordinar los servicios solicitados. El tratamiento de información realizado directamente por WhatsApp también estará sujeto a las condiciones y políticas de privacidad de dicha plataforma.</p>`],
                ["10. Datos sensibles y de menores de edad", `<p>EMAA Eventos no tiene como finalidad recopilar datos sensibles de sus clientes. En caso de que sea necesario tratar información sensible, se solicitará autorización explícita cuando corresponda y se informará al titular que no está obligado a suministrarla, salvo las excepciones legales.</p><p>Cuando un cliente informe voluntariamente sobre alergias o restricciones alimentarias, EMAA Eventos utilizará esa información únicamente para evaluar y atender los requerimientos relacionados con la seguridad alimentaria del pedido, aplicando las garantías legales correspondientes.</p><p>EMAA Eventos no dirige sus servicios de recopilación de datos a menores de edad. Si excepcionalmente se requiere tratar sus datos personales, se respetarán las disposiciones legales especiales y el interés superior del menor.</p>`],
                ["11. Derechos de los titulares", `<p>Los titulares de los datos personales tendrán los siguientes derechos:</p><ol><li>Conocer, actualizar y rectificar sus datos personales.</li><li>Solicitar prueba de la autorización otorgada.</li><li>Conocer el uso que se ha dado a sus datos personales.</li><li>Presentar consultas y reclamos relacionados con el tratamiento de su información.</li><li>Solicitar la supresión de sus datos cuando sea legalmente procedente.</li><li>Revocar la autorización de tratamiento cuando sea legalmente procedente.</li><li>Acceder gratuitamente a sus datos personales.</li><li>Presentar quejas ante la Superintendencia de Industria y Comercio, una vez agotado el trámite de consulta o reclamo ante el responsable, cuando corresponda.</li></ol>`],
                ["12. Consultas", `<p>Los titulares o sus representantes podrán consultar la información personal que repose en las bases de datos de EMAA Eventos.</p><p>Para realizar una consulta deberán enviar una solicitud a través del correo electrónico o WhatsApp oficial, indicando:</p><ul><li>Nombre completo del titular.</li><li>Identificación, cuando sea necesaria para verificar su identidad.</li><li>Descripción de la consulta.</li><li>Información de contacto para recibir respuesta.</li></ul><p>EMAA Eventos atenderá las consultas dentro de los diez (10) días hábiles siguientes a su recepción. Cuando no sea posible atenderlas dentro de este plazo, se informará al interesado el motivo de la demora y la nueva fecha de respuesta, que no podrá superar los cinco (5) días hábiles siguientes al vencimiento del primer plazo.</p>`],
                ["13. Reclamos", `<p>Cuando el titular considere que sus datos personales deben ser corregidos, actualizados o suprimidos, o advierta un posible incumplimiento de las disposiciones legales, podrá presentar un reclamo.</p><p>El reclamo deberá contener:</p><ul><li>Identificación del titular.</li><li>Descripción de los hechos que originan el reclamo.</li><li>Dirección o medio de contacto para recibir respuesta.</li><li>Documentos que se consideren necesarios para respaldar la solicitud.</li></ul><p>Si el reclamo está incompleto, EMAA Eventos solicitará al interesado que lo complete dentro de los cinco (5) días hábiles siguientes a su recepción.</p><p>El reclamo será atendido dentro de los quince (15) días hábiles siguientes al día de su recepción, siempre que esté completo. Cuando no sea posible atenderlo dentro de ese plazo, se informarán los motivos y la nueva fecha de respuesta, que no podrá superar los ocho (8) días hábiles siguientes al vencimiento del primer plazo.</p>`],
                ["14. Seguridad y acceso a los datos", `<p>EMAA Eventos implementará medidas administrativas, técnicas y organizativas razonables para proteger la información personal. Estas medidas estarán orientadas a prevenir:</p><ul><li>Acceso no autorizado a los datos.</li><li>Pérdida o destrucción de información.</li><li>Alteración o divulgación indebida.</li><li>Uso de la información para finalidades no autorizadas.</li></ul><p>El acceso a los datos estará limitado a las personas que necesiten conocerlos para desarrollar las actividades autorizadas.</p>`],
                ["15. Conservación, proveedores y transferencias", `<p>Los datos personales serán conservados durante el tiempo necesario para cumplir las finalidades del tratamiento y atender las obligaciones legales, contractuales, contables o comerciales correspondientes. Una vez cumplidas las finalidades y los plazos legales aplicables, los datos serán suprimidos o sometidos a las medidas de conservación que establezca la ley.</p><p>EMAA Eventos podrá compartir información personal con proveedores o terceros que presten servicios necesarios para el desarrollo de sus actividades, siempre que exista una finalidad legítima y se cumplan las disposiciones legales aplicables. Cuando corresponda, se establecerán acuerdos y obligaciones de confidencialidad y seguridad con los encargados del tratamiento.</p><p>La transmisión o transferencia de datos personales a otros países se realizará de acuerdo con las condiciones y restricciones establecidas en la legislación colombiana.</p>`],
                ["16. Cookies", `<p>El sitio web de EMAA Eventos podrá utilizar cookies y tecnologías similares para facilitar la navegación, mejorar el funcionamiento de la página y obtener información general sobre su utilización. Cuando corresponda, se informará a los usuarios sobre su utilización y las opciones disponibles para gestionar sus preferencias.</p>`],
                ["17. Compromisos de EMAA Eventos", `<p>EMAA Eventos se compromete a:</p><ul><li>Garantizar el ejercicio de los derechos de los titulares.</li><li>Solicitar y conservar las autorizaciones cuando sean necesarias.</li><li>Informar las finalidades del tratamiento.</li><li>Proteger la información mediante medidas de seguridad adecuadas.</li><li>Mantener actualizada la información.</li><li>Atender oportunamente consultas y reclamos.</li><li>Respetar las condiciones de confidencialidad.</li><li>Cumplir las instrucciones impartidas por las autoridades competentes.</li></ul>`],
                ["18. Modificaciones y vigencia", `<p>EMAA Eventos podrá modificar esta política cuando existan cambios en sus procesos, actividades comerciales o disposiciones legales. Las modificaciones serán publicadas en el sitio web para conocimiento de los usuarios. Cuando los cambios impliquen nuevas finalidades para el tratamiento de los datos, se solicitará la autorización correspondiente cuando sea exigible.</p><p>La presente Política de Tratamiento de Datos Personales entra en vigencia a partir de su publicación y será aplicable a todas las actividades de tratamiento de información personal realizadas por EMAA Eventos.</p>`],
                ["19. Canales de atención", `<p>Para ejercer los derechos relacionados con la protección de datos personales o presentar consultas y reclamos, los titulares podrán comunicarse a través de:</p><ul><li>EMAA Eventos – Tablas de Quesos.</li><li>Correo electrónico: emaaeventosmzl@gmail.com.</li><li>WhatsApp: +573246501091.</li><li>Ciudad: Manizales, Caldas.</li><li>Sitio web: [Agregar dominio oficial].</li></ul><p>EMAA Eventos reafirma su compromiso con la privacidad, la seguridad y el uso responsable de la información personal de sus clientes y usuarios.</p>`]
            ]
        }
    };

    const categoriaSeleccionada = contenidos[categoria];
    if (!categoriaSeleccionada) return;

    if (categoriaSeleccionada.secciones) {
        contenido.innerHTML = `
            <h2>${categoriaSeleccionada.titulo}</h2>
            <article class="terminos-condiciones">
                ${categoriaSeleccionada.secciones.map(([titulo, texto]) => `
                    <section class="termino-seccion">
                        <h3>${titulo}</h3>
                        ${texto}
                    </section>
                `).join("")}
            </article>
        `;
    } else {
        contenido.innerHTML = `
            <h2>${categoriaSeleccionada.titulo}</h2>
            <div class="faq">
                ${categoriaSeleccionada.preguntas.map(([pregunta, respuesta]) => `
                    <button class="pregunta" type="button">► ${pregunta}</button>
                    <div class="respuesta"><p>${respuesta}</p></div>
                `).join("")}
            </div>
        `;
    }
    seccion.classList.toggle("contenido-comprar", categoria === "comprar");

    if (!categoriaSeleccionada.secciones) activarPreguntas();
}

function activarPreguntas(){
    const preguntas = document.querySelectorAll(".pregunta");
    preguntas.forEach((pregunta)=>{

       pregunta.addEventListener("click",()=>{

    const respuesta = pregunta.nextElementSibling;

    respuesta.classList.toggle("mostrar");

    if(respuesta.classList.contains("mostrar")){

        pregunta.innerHTML="▼ "+pregunta.textContent.replace("► ","").replace("▼ ","");

    }else{

        pregunta.innerHTML="► "+pregunta.textContent.replace("► ","").replace("▼ ","");

    }
    });
});
}
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === "#politica-privacidad") {
        mostrarCategoria("Politica de privacidad");
    }
});