export default {
template: `

<div style="
display:flex;
justify-content:center;
align-items:center;
padding:80px 20px;
">

<div style="
background:white;
padding:45px;
width:520px;
border-radius:14px;
box-shadow:0 6px 20px rgba(0,0,0,0.08);
">

<h1 style="
text-align:center;
margin-bottom:30px;
font-size:28px;
font-weight:700;
">
Kayıt Gönder
</h1>

<label>Kullanıcı adı</label> <input style="
width:100%;
margin:8px 0 18px;
padding:10px;
border:1px solid #ccc;
border-radius:6px;
"
placeholder="Kullanıcı adınız">

<label>Seviye</label> <select style="
width:100%;
margin:8px 0 18px;
padding:10px;
border:1px solid #ccc;
border-radius:6px;
">

<option>Bir seviye seçin...</option>
</select>

<label>Kayıt Bağlantısı</label> <input style="
width:100%;
margin:8px 0 18px;
padding:10px;
border:1px solid #ccc;
border-radius:6px;
"
placeholder="https://...">

<label>Ham Görüntü Bağlantısı</label> <input style="
width:100%;
margin:8px 0 18px;
padding:10px;
border:1px solid #ccc;
border-radius:6px;
"
placeholder="https://...">

<label>Notlar</label> <input style="
width:100%;
margin:8px 0 18px;
padding:10px;
border:1px solid #ccc;
border-radius:6px;
"
placeholder="Başka notlarınız var mı...?">

<label>Platform</label>

<div style="
display:flex;
gap:25px;
margin:10px 0 25px;
">
<label><input type="radio" name="platform"> Mobil</label>
<label><input type="radio" name="platform"> Bilgisayar</label>
</div>

<p style="
font-size:13px;
color:#666;
margin-bottom:20px;
">
Lütfen göndermeden önce Gönderim Yönergelerini okuyun.
</p>

<button style="
width:100%;
padding:12px;
background:#7ea6e0;
border:none;
border-radius:8px;
color:white;
font-weight:600;
font-size:15px;
cursor:pointer;
">
Göndermek </button>

</div>
</div>
`
}

