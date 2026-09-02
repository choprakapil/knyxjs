const fs = require('fs');
const file = '/Users/apple/Downloads/project shivam/app/admin/(dashboard)/settings/page.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'const [features, setFeatures] = useState(DEFAULT_FEATURES);',
  'const [featurePopupGlobal, setFeaturePopupGlobal] = useState(true);\n  const [features, setFeatures] = useState(DEFAULT_FEATURES);'
);

content = content.replace(
  'if (data.settings?.content?.features) {',
  'if (data.settings?.content) {\n          if (data.settings.content.featurePopupGlobal !== undefined) {\n            setFeaturePopupGlobal(data.settings.content.featurePopupGlobal);\n          }\n        }\n        if (data.settings?.content?.features) {'
);

content = content.replace(
  'content: {\n          features: features\n        }',
  'content: {\n          features: features,\n          featurePopupGlobal: featurePopupGlobal\n        }'
);

const globalToggleUI = `
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", padding: "16px", borderRadius: "12px", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>Global Popup Visibility</h4>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Enable or disable feature detail popups across the entire website.</p>
                    </div>
                    <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
                      <input type="checkbox" checked={featurePopupGlobal} onChange={(e) => setFeaturePopupGlobal(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: featurePopupGlobal ? "#3257ff" : "#cbd5e1", transition: ".4s", borderRadius: "24px" }}></span>
                      <span style={{ position: "absolute", cursor: "pointer", top: "2px", left: featurePopupGlobal ? "22px" : "2px", width: "20px", height: "20px", backgroundColor: "white", transition: ".4s", borderRadius: "50%" }}></span>
                    </label>
                  </div>
`;

content = content.replace(
  '<div style={{ display: "flex", gap: "24px", minHeight: "450px" }}>',
  globalToggleUI + '\n                  <div style={{ display: "flex", gap: "24px", minHeight: "450px" }}>'
);

const individualToggleUI = `
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                            <div>
                              <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: "0 0 2px 0" }}>Enable Popup for this Feature</h4>
                              <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>If disabled, clicking this feature on the product page will not open a popup.</p>
                            </div>
                            <label style={{ position: "relative", display: "inline-block", width: "36px", height: "20px" }}>
                              <input type="checkbox" checked={f.disablePopup !== true} onChange={(e) => handleFeatureFieldChange(selectedFeatureId, "disablePopup", null, !e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                              <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: f.disablePopup !== true ? "#10b981" : "#cbd5e1", transition: ".4s", borderRadius: "20px" }}></span>
                              <span style={{ position: "absolute", cursor: "pointer", top: "2px", left: f.disablePopup !== true ? "18px" : "2px", width: "16px", height: "16px", backgroundColor: "white", transition: ".4s", borderRadius: "50%" }}></span>
                            </label>
                          </div>
`;

content = content.replace(
  '<h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>Modal Popup Details</h4>',
  '<h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>Modal Popup Details</h4>\n                            ' + individualToggleUI
);

fs.writeFileSync(file, content);
