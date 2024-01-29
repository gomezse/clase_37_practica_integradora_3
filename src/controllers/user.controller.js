import { usersManager } from '../dao/models/mongoose/UsersManager.js';
import {userService} from '../services/user.service.js';

const getUser = async (req, res) => {
  res.json({
    message: "User founded successfully",
    user: await userService.getUser(req),
  });
};

const create =async (req, res) => {
  const user = req.body;
  const createdUser = await userService.create(user);
  res.json({ createdUser });
}

const sendmail= async(req,res)=>{
  const { email } = req.body;

  // Buscar el usuario por correo electrónico
  const user = await usersModel.findOne({ email });

  if (!user) {
    return res.status(404).send('Usuario no encontrado');
  }

  // Crear un token único y almacenarlo en la base de datos
  const token = crypto.randomBytes(32).toString('hex');
  const resetToken = await ResetToken.create({ user: user._id, token });

  // Enviar correo con el enlace de restablecimiento
  const resetUrl = `http://localhost:8080/api/restaurar`;
  const mailOptions = {
    from: 'gomezsebastian909@gmail.com',
    to: email,
    subject: 'Restablecer Contraseña',
    html: `<p>Haz clic <a href="${resetUrl}">aquí</a> para restablecer tu contraseña.</p>`,
  };

  await transporter.sendMail(mailOptions);
  res.send('Correo de restablecimiento enviado.');
}

const resetPasswordGET= async (req,res)=>{
  const { token } = req.params;

  // Buscar el token en la base de datos
  const resetToken = await ResetToken.findOne({ token }).populate('user');

  if (!resetToken || !resetToken.user) {
    return res.status(404).send('Token no válido');
  }

  // Verificar si el token ha expirado
  if (resetToken.createdAt < Date.now()) {
    // Aquí deberías redirigir a una vista para generar un nuevo token
    return res.redirect('/generar-nuevo-token');
  }

  // Renderizar la vista para restablecer la contraseña con el token
  res.render('resetPassword', { token });
}

const resetPasswordPOST= async (req,res)=>{
  const { token } = req.params;
  const { password } = req.body;

  // Buscar el token en la base de datos  
  const resetToken = await ResetToken.findOne({ token }).populate('user');

  if (!resetToken || !resetToken.user) {
    return res.status(404).send('Token no válido');
  }

  // Verificar si el token ha expirado
  if (resetToken.createdAt < Date.now()) {
    // Aquí deberías redirigir a una vista para generar un nuevo token
    return res.redirect('/generar-nuevo-token');
  }

  // Verificar si la contraseña es diferente a la actual
  if (password === resetToken.user.password) {
    return res.status(400).send('La nueva contraseña debe ser diferente a la actual');
  }

  // Actualizar la contraseña del usuario
  resetToken.user.password = password;
  await resetToken.user.save();

  // Eliminar el token de restablecimiento de la base de datos
  await resetToken.remove();

  res.send('Contraseña restablecida exitosamente.');
}

const premium= async (req,res)=>{

const user = await usersManager.findById(req.params.id);
const ROLES_ADMITIDOS =["PREMIUM","USER"];
if(!user){
  return res.status(400).json({message:"User not found"});
}


if(ROLES_ADMITIDOS.includes(user.role)){
  user.role = ROLES_ADMITIDOS.filter(rol=> rol != user.role);
  await user.save();
  return res.status(200).json({message:"Role updated",usuario:user});
}

return res.status(400).json({message:"Role cannot be modified",usuario:user});
}
export const userController = {
  "getUser": getUser,
  "create":create,
  "sendmail":sendmail,
  "resetPasswordGET":resetPasswordGET,
  "resetPasswordPOST":resetPasswordPOST,
  "premium":premium
};
