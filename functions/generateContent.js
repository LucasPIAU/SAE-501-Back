const generateContent = (data) => {
    const content = [];
    
    content.push({
      type: "title",
      data: data.name
    });
  
    content.push({
      type: "desc",
      data: data.description
    });
  
    // const attributesList = [
    //   `Filière : ${data.filiere}`,
    //   `Attributs de la formation : ${data.data.attributs}`
    // ];
    // content.push({
    //   type: "desc",
    //   data: attributesList
    // });
    
  
    return content;
  };
  
export default generateContent;
  