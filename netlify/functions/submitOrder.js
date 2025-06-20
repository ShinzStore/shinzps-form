// netlify/functions/submitOrder.js

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ status: 'error', message: 'Method Not Allowed' }),
    };
  }
  try {
    // Parse body JSON dari frontend
    const data = JSON.parse(event.body);

    // Web App URL Apps Script Tuan – sudah siap dimasukkan
    const scriptURL = "https://script.google.com/macros/s/AKfycby2AIB2s9Kn-sxt_PfZ1pQ4pvq95VC3sSi4cSGJgTh9yqGL7F8M54Mb86sn8T2qMQdcUQ/exec";

    // Hantar POST ke Apps Script Web App
    const resp = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Terima response JSON dari Apps Script
    const result = await resp.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: err.toString() }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
}
