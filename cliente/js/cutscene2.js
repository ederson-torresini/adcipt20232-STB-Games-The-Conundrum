export default class Cutscene2 extends Phaser.Scene {
    constructor () {
        super('cutscene2');
    }

    preload () {
        this.load.image('fundocinza', 'assets/fundocinza.png');

        /*Full Screen*/

        this.load.spritesheet('tela-cheia', './assets/FullScreenICO.png', {
            frameWidth: 32,
            frameHeight: 32
        })
    }

    create () {
        // Adicione as imagens e defina a visibilidade inicial
        const fundocinzaImage = this.add.image(400, 225, 'fundocinza').setAlpha(0);

        const telaLargura = 800;
        const telaAltura = 450;

        const texto = "Uma vez flamengo, sempre flamengo, flamengo sempre eu ei de ser, é meu maior prazer, ve-lo brilhar, seja na terra, seja no mar, vencer vnecer vencer, uma vez flamengo, flamengo até morrer. Na regata ele me mata, me maltrata, me arrebata de EMOÇÃO, NU CORAÇÃO, CONSAGRADO NOS GRAMADOS, SEMPRE AMADO, O MAIS COTADO, NO FLA-FLU É O AI JESUS, eu teria um desgosto profundo se faltasse o flamengo no mundo, ele vibra ele é fibra muita libra ja pesou, flamengo ate morrer eu sou. *instrumental* "

        const tamanhoFonte = Math.min(telaLargura * 0.02, telaAltura * 0.1); // Ajuste os valores 0.05 e 0.1 conforme necessário // NÃO ESTOU UTILIZANDO, PORÉM É SÓ BOTAR NO LUGAR DO *32* EM FONTSIZE, É UMA VARIÁVEL QUE FICA COMPATÍVEL COM O TAMANHO DA TELA.

        this.mensagem = this.add.text(100, 20, texto, {
            fontFamily: "Felipa",
            fontSize: 32 + "px",
            wordWrap: {
                width: telaLargura - 200, // Defina a largura máxima para evitar que o texto saia da tela, 
                useAdvancedWrap: true,
            }
        })

        // Crie botões para avançar e retroceder
        const nextButton = this.add.text(750, 225, '->', {
            fontSize: '18px',
            fill: '#fff',
        });
        nextButton.setOrigin(0.5);
        nextButton.setInteractive();

        const prevButton = this.add.text(50, 225, '<-', {
            fontSize: '18px',
            fill: '#fff',
        });
        prevButton.setOrigin(0.5);
        prevButton.setInteractive();

        // Função para animar a transição para a próxima cena
        const goToNextScene = () => {
            this.scene.start('loading');
        };

        // Função para animar a transição para a cena anterior
        const goToPreviousScene = () => {
            this.scene.start('cutscene1'); // Substitua 'cena_anterior' pelo nome da cena anterior
        };

        // Configurar eventos de clique para os botões
        nextButton.on('pointerdown', () => {
            // Animação de Fade Out para a cena atual
            fadeOut(fundocinzaImage, 1000, () => {
                // Chame a função para avançar para a próxima cena
                goToNextScene();
            });
        });

        prevButton.on('pointerdown', () => {
            // Animação de Fade Out para a cena atual
            fadeOut(fundocinzaImage, 1000, () => {
                // Chame a função para retroceder para a cena anterior
                goToPreviousScene();
            });
        });

        const fadeIn = (target, duration, onComplete) => {
            this.tweens.add({
                targets: target,
                alpha: 1,
                duration: duration,
                onComplete: onComplete,
            });
        };

        const fadeOut = (target, duration, onComplete) => {
            this.tweens.add({
                targets: target,
                alpha: 0,
                duration: duration,
                onComplete: onComplete,
            });
        };

        // Inicie a cena com o Fade In para 'fundocinza'
        fadeIn(fundocinzaImage, 1000);
    }
}
