async function test() {
  const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIxYjQ4ZTFmODk4MTA2NDg5ODI1MTE5NjcwMWM3MDZkY2JhNGY1YjIyOGI2YTlmNzcxYjg0NzYyMzJkNGZlNGI1NjNmYjZjN2NjOTc2ZWRjNiIsImlhdCI6MTc4ODg0ODAyOC4wNTg2NzYsIm5iZiI6MTc4ODg0ODAyOC4wNTg2NzgsImV4cCI6MTgwNDQ2NDAwMC4wNDA4OTEsInN1YiI6Ijc5MjM2MDIiLCJzY29wZXMiOltdfQ.5cVg4fjVxiVU_EC0ZNAKzZ73PiHC7YFSqRlTNwt2prdsdD7tJrzTL2op457utzl36wTOw41SNwrtgmORClpzQCGE3bCpWZx_aQags_Uu0qXvmignJoGhGeGLj4bSvJ1qhfwKBYLj8ksmnUPw-V5sBmMjJ8p24e4INtEiiyeNliNJPEWvVJVehW2CIz4tStj2i0tZE5copxWH1eUaaiMQw9qjdCjpLEtwAUpTpza7qbz_CJZUA-0B2OWfLGJMcBV8I_Z5cIkMPBHHILhjfi76xHgecrz_10jG9oYlfg6dONuNC7wzZFyapLCdFaie2-92NkNp8GdfmL4wee82deh4g2BKwBrBaTfyd8zf4ZIhjgT63fI6m_ayLlUmVr5W43Dt6Dhz0craQr9vSY-jiwVIxT7hpseJadTB4VvCbK13BOoHEzEsqsOhCKVrCANQoMCoV8Pyby2FUScRDlctpyYLV2K7yeWyEe6CJetJpYgrCJGlaH6WVDTPHlORW_6uQ24N3RCt7l2rbWB8RuTQ9Q7Y8jCPtKeTZfSvNW4Kx9xyLktdzj2z_ind0L2BvlE6xbJ6nOPUNpHEVCcJvWEhlyeiCSVbKd8a5b9zbGIr95P1-V9gGEa40pZavJF66s-tZpS-Tb9Z2irkfi-gdM7zbFdK2VoJhPNk3UehMlW2ZXT8uX8';
  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          product_options: {
            name: "Deep Chemistry Report",
            redirect_url: "http://localhost"
          },
          custom_price: 499,
          checkout_data: {
            email: "test@test.com",
            custom: {}
          }
        },
        relationships: {
          store: { data: { type: "stores", id: "469778" } },
          variant: { data: { type: "variants", id: "2103661" } }
        }
      }
    })
  });
  console.log(response.status);
  const data = await response.json();
  console.log(JSON.stringify(data));
}
test();
