import React from 'react';
import { ShieldCheck, Luggage, Info, PhoneOff } from 'lucide-react';

function Guidelines() {
  return (
    <div className="page-content fade-in">
      <h2 className="section-title"><ShieldCheck className="icon-title"/> Essential Yatra Guidelines</h2>
      
      <div className="grid-cards" style={{marginBottom: '40px'}}>
        <div className="card info-card">
          <h3><Luggage size={20} style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/> What to Pack</h3>
          <ul style={{paddingLeft: '20px', lineHeight: '1.6', color: 'var(--text-muted)'}}>
            <li><strong>Footwear:</strong> Comfortable, broken-in trekking shoes with good grip.</li>
            <li><strong>Clothing:</strong> Light woollens for summer nights; heavy woollens (jackets, thermals) for winters.</li>
            <li><strong>Rain Gear:</strong> Always carry a raincoat or umbrella as mountain weather is unpredictable.</li>
            <li><strong>Medical Kit:</strong> Basic first aid, pain relievers, and personal medications.</li>
          </ul>
        </div>
        
        <div className="card info-card">
          <h3><PhoneOff size={20} style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/> Telecom & Connectivity</h3>
          <ul style={{paddingLeft: '20px', lineHeight: '1.6', color: 'var(--text-muted)'}}>
            <li><strong>Prepaid SIMs Do NOT Work:</strong> Due to security reasons, prepaid mobile connections from outside J&K will not work.</li>
            <li><strong>Postpaid is Required:</strong> Ensure you have a postpaid connection (Jio, Airtel, BSNL work best).</li>
            <li><strong>Wi-Fi:</strong> Free Wi-Fi spots are available at major points like Ardhkuwari and Bhawan.</li>
          </ul>
        </div>
      </div>

      <div className="card content-card">
        <h3><Info size={20} style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/> Important Rules & Regulations</h3>
        <p>Please strictly adhere to the following rules set by the Shrine Board to ensure a safe and spiritual journey:</p>
        <ul>
          <li style={{marginBottom: '12px'}}><strong>RFID Card Mandatory:</strong> The traditional paper Yatra Parchi has been completely replaced. You MUST collect a physical RFID card from the registration counters in Katra before starting the trek.</li>
          <li style={{marginBottom: '12px'}}><strong>No Plastic Zone:</strong> The entire trek from Katra to Bhawan is a plastic-free zone. Do not carry polythene bags or plastic bottles.</li>
          <li style={{marginBottom: '12px'}}><strong>Photography:</strong> Photography is strictly prohibited inside the Holy Cave. Please deposit your phones and cameras in the free lockers provided before joining the queue.</li>
          <li style={{marginBottom: '12px'}}><strong>Medical Check:</strong> If you have a heart condition, asthma, or are pregnant, please consult the medical officers at the base camp before beginning the 12km steep trek.</li>
        </ul>
      </div>
    </div>
  );
}

export default Guidelines;
