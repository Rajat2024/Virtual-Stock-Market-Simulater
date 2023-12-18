const Axios = require("axios");

exports.getNewsData = async (req, res) => {

  try {
    // these are free API_KEY
    // pub_34966bd750465fa9067e371e2ff8e61c990a9
    // pub_34967b44b0d25a5ec1096c1b2135672c1004f
    // pub_34969f0cb245aa914cfc7aee2e1232ce1a146
    // pub_349701ebbe1cefd9915e5af490160cb3dd523
    
    console.log("API is Called");
    const token = process.env.NEWS_API_KEY;
    const url2 = `https://newsapi.org/v2/everything?q=business&sortBy=publishedAt&apiKey=${token}&language=en&pageSize=6&page=${req.params.page}`;
    const response2 = await Axios.get(url2);
    function extractFirst17Words(inputString) {
      const words = inputString.split(/\s+/); // Split the string by whitespace
      const first17Words = words.slice(0, 17).join(" ");
      // If the total number of characters exceeds 120, truncate the string
      const truncatedString = first17Words.length > 120 ? first17Words.slice(0, 120) : first17Words;

      return truncatedString;
    }
    const destructure_data = response2.data.articles.map(({ url, description, urlToImage }) => ({
      url,
      headline: extractFirst17Words(description),
      image: urlToImage
    }));



    return res.status(200).json({ status: "success", data: destructure_data, });

  } catch (error) {
    console.log(error);
    return res.status(200).json({ status: "fail", });
  }
};
