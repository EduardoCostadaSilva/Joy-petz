CREATE TABLE `animais`(
    `idanimal` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `sexo` VARCHAR(100) NOT NULL,
    `idade` INT NOT NULL,
    `especie` VARCHAR(100) NOT NULL,
    `foto` BLOB NOT NULL,
    `descricao` VARCHAR(500) NOT NULL
);
CREATE TABLE `user_animal`(
    `iduser_animal` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_idusuario` INT NOT NULL,
    `user_idanimal` INT NOT NULL,
    `contato` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(100) NOT NULL,
    `data` DATE NOT NULL
);
CREATE TABLE `usuarios`(
    `idusuario` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `tipo` INT NOT NULL
);
ALTER TABLE
    `user_animal` ADD CONSTRAINT `user_animal_user_idanimal_foreign` FOREIGN KEY(`user_idanimal`) REFERENCES `animais`(`idanimal`);
ALTER TABLE
    `user_animal` ADD CONSTRAINT `user_animal_user_idusuario_foreign` FOREIGN KEY(`user_idusuario`) REFERENCES `usuarios`(`idusuario`);