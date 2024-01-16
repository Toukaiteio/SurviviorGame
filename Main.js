//Initial Page
//Load Head
function Load_Script(link) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = link;
      script.onload = () => {
        resolve(script);
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.head.appendChild(script);
    });
}
(async ()=>{
    await Load_Script("./Scripts/ExceptionHandler.js");
    try {
      await Load_Script("./Resources/lang/zh-CN.js");
        await Load_Script("./Scripts/Controller/RenderController.js");
        await inject_script();
        await Load_Script("./Scripts/Functions/Util.js");
        await Load_Script("./Scripts/Functions/ResourceLoader.js");
        await Load_Script("./Scripts/Functions/DataStorage.js");
        await Load_Script("./Scripts/Functions/TempStorage.js");
        await Load_Script("./Scripts/Functions/GameEvents.js");
        await Load_Script("./Scripts/Functions/InitItemMap.js");
        await Load_Script("./Scripts/Functions/GameValueInit.js");
        await Load_Script("./Scripts/Functions/GameTag.js");
        await Load_Script("./Scripts/Functions/Builder.js");
        
        await Load_Script("./Scripts/Controller/SoundController.js");
        const MainPage="before_start_page";
        PageRender(LoadedPageList[MainPage]);
    } catch (error) {
        Exception_Handler(error);
    }
})()
