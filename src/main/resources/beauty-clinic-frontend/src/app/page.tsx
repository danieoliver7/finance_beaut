'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Adicionar script para rolagem suave e navegação ativa
  useEffect(() => {
    const handleSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const href = this.getAttribute('href');
          if (!href) return;
          
          const target = document.querySelector(href);
          if (!target) return;
          
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Fecha o menu mobile após clicar
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse?.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
          }
        });
      });
    };

    const handleActiveNav = () => {
      const sections = document.querySelectorAll('section');
      const navItems = document.querySelectorAll('.nav-link');
      
      window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id') || '';
          }
        });
        
        navItems.forEach(item => {
          item.classList.remove('active');
          const href = item.getAttribute('href');
          if (href === `#${current}`) {
            item.classList.add('active');
          }
        });
      });
    };

    handleSmoothScroll();
    handleActiveNav();
  }, []);

  return (
    <>
      {/* Barra de Navegação */}
      <header className="header fixed-top">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link href="/" className="navbar-brand">Beauty Clinic</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#inicio">Início</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#sobre">Nos Conheça</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#servicos">Nossos Serviços</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#depoimentos">Depoimentos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contato">Contato</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section / Início */}
      <section id="inicio" className="hero-section">
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img 
                src="https://placehold.co/600x500/f8f0f5/593043?text=Beauty+Clinic" 
                alt="Beauty Clinic" 
                className="img-fluid rounded shadow-lg" 
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-lg-6 text-center text-lg-start mt-4 mt-lg-0">
              <h1 className="hero-heading mb-4">REVELE SUA MELHOR VERSÃO NA SUA ATUAL IDADE</h1>
              <p className="lead mb-4">Nossa clínica oferece os mais avançados tratamentos estéticos para que você alcance resultados excepcionais.</p>
              <p className="mb-4">O tempo não para e, com ele, as mudanças na nossa pele se tornam mais evidentes. Mas isso não significa que você precisa aceitar o envelhecimento sem cuidados. Com o plano de tratamento personalizado, você pode gerenciar o envelhecimento de forma eficaz e natural, valorizando a sua beleza única.</p>
              <a href="#contato" className="btn btn-primary btn-lg">Agende sua consulta</a>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós / Nos Conheça */}
      <section id="sobre" className="py-5" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">NOS CONHEÇA</h2>
            <p className="section-subtitle">Conheça mais sobre nossa clínica e profissionais</p>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h3 className="mb-4" style={{ color: 'var(--primary-color)' }}>Quem Somos</h3>
              <p>A Beauty Clinic é uma clínica de estética especializada em tratamentos faciais e corporais, que oferece os mais modernos procedimentos estéticos do mercado. Contamos com uma equipe de profissionais altamente qualificados e experientes, prontos para oferecer o melhor atendimento e resultados excepcionais.</p>
              <p>Nossa missão é proporcionar bem-estar e autoestima através de tratamentos personalizados, respeitando a individualidade de cada cliente e utilizando tecnologias avançadas para garantir resultados naturais e duradouros.</p>
              <p>Nossos valores incluem:</p>
              <ul>
                <li>Excelência em atendimento</li>
                <li>Compromisso com resultados</li>
                <li>Ética profissional</li>
                <li>Inovação constante</li>
                <li>Valorização da beleza natural</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <h3 className="mb-4" style={{ color: 'var(--primary-color)' }}>Nossa Estrutura</h3>
              <p>Contamos com uma estrutura moderna e aconchegante, projetada para proporcionar o máximo de conforto durante os procedimentos. Nossas salas são equipadas com tecnologia de ponta e seguem rigorosos protocolos de higiene e segurança.</p>
              <div className="row mt-4">
                <div className="col-md-6 mb-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="bi bi-award text-primary fs-1 mb-3"></i>
                      <h5>Profissionais Certificados</h5>
                      <p className="small">Equipe com formação especializada e certificações internacionais</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body text-center">
                      <i className="bi bi-gear text-primary fs-1 mb-3"></i>
                      <h5>Equipamentos Modernos</h5>
                      <p className="small">Tecnologia de ponta para tratamentos mais eficazes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Serviços */}
      <section id="servicos" className="py-5" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">NOSSOS SERVIÇOS</h2>
            <p className="section-subtitle">Conheça os tratamentos disponíveis na nossa clínica</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm service-card">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-white d-inline-flex p-3 mb-3">
                    <i className="bi bi-gem text-primary fs-2"></i>
                  </div>
                  <h4 className="card-title">Tratamentos Faciais</h4>
                  <p className="card-text">Limpeza de pele, peeling, microagulhamento e outros procedimentos para rejuvenescimento facial.</p>
                  <ul className="list-unstyled text-start">
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Limpeza de pele profunda</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Peeling químico</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Microagulhamento</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Preenchimento</li>
                  </ul>
                  <a href="#contato" className="btn btn-outline-primary mt-3">Mais informações</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm service-card">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-white d-inline-flex p-3 mb-3">
                    <i className="bi bi-water text-primary fs-2"></i>
                  </div>
                  <h4 className="card-title">Tratamentos Corporais</h4>
                  <p className="card-text">Drenagem linfática, massagem modeladora, redução de medidas e outros procedimentos estéticos.</p>
                  <ul className="list-unstyled text-start">
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Drenagem linfática</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Massagem modeladora</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Tratamento para celulite</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Criolipólise</li>
                  </ul>
                  <a href="#contato" className="btn btn-outline-primary mt-3">Mais informações</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm service-card">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-white d-inline-flex p-3 mb-3">
                    <i className="bi bi-lightning-charge text-primary fs-2"></i>
                  </div>
                  <h4 className="card-title">Estética Avançada</h4>
                  <p className="card-text">Procedimentos de alta tecnologia como laser, radiofrequência, ultrassom e outros.</p>
                  <ul className="list-unstyled text-start">
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Radiofrequência</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Ultrassom focalizado</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Laser para rejuvenescimento</li>
                    <li><i className="bi bi-check-circle text-primary me-2"></i>Depilação a laser</li>
                  </ul>
                  <a href="#contato" className="btn btn-outline-primary mt-3">Mais informações</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-5" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">DEPOIMENTOS</h2>
            <p className="section-subtitle">O que nossos clientes dizem sobre nós</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm testimonial-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <img src="https://via.placeholder.com/60x60" alt="Cliente" className="rounded-circle" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-0">Ana Silva</h5>
                      <div className="text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                    </div>
                  </div>
                  <p className="card-text">"Fantástico atendimento! Fiz um tratamento facial e os resultados superaram minhas expectativas. A equipe é extremamente profissional e atenciosa. Recomendo a todos que buscam cuidados estéticos de qualidade."</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm testimonial-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <img src="https://via.placeholder.com/60x60" alt="Cliente" className="rounded-circle" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-0">Carlos Oliveira</h5>
                      <div className="text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                      </div>
                    </div>
                  </div>
                  <p className="card-text">"Fiz o tratamento de radiofrequência e os resultados foram visíveis logo nas primeiras sessões. O ambiente é super agradável e os profissionais explicam detalhadamente cada procedimento."</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm testimonial-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <img src="https://via.placeholder.com/60x60" alt="Cliente" className="rounded-circle" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-0">Mariana Costa</h5>
                      <div className="text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                    </div>
                  </div>
                  <p className="card-text">"Sou cliente há mais de 2 anos e sempre saio satisfeita com os tratamentos. A clínica está sempre se atualizando com as melhores tecnologias. O plano personalizado fez toda diferença para minha pele."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">CONTATO</h2>
            <p className="section-subtitle">Entre em contato conosco e agende sua avaliação</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="contact-info-box mb-4">
                <h4 className="mb-4" style={{ color: 'var(--primary-color)' }}>Informações de Contato</h4>
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0">
                    <i className="bi bi-geo-alt-fill fs-4 text-primary"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5>Endereço</h5>
                    <p>Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100</p>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0">
                    <i className="bi bi-telephone-fill fs-4 text-primary"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5>Telefone</h5>
                    <p>(11) 99999-9999</p>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0">
                    <i className="bi bi-envelope-fill fs-4 text-primary"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5>Email</h5>
                    <p>contato@beautyclinic.com</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <i className="bi bi-clock-fill fs-4 text-primary"></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5>Horário de Funcionamento</h5>
                    <p>Segunda a Sexta: 9h às 18h<br />Sábado: 9h às 13h</p>
                  </div>
                </div>
              </div>
              <div className="social-links mt-4">
                <a href="#" className="btn btn-outline-primary me-2"><i className="bi bi-facebook"></i></a>
                <a href="#" className="btn btn-outline-primary me-2"><i className="bi bi-instagram"></i></a>
                <a href="#" className="btn btn-outline-primary me-2"><i className="bi bi-whatsapp"></i></a>
                <a href="#" className="btn btn-outline-primary"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="mb-4" style={{ color: 'var(--primary-color)' }}>Agende sua Avaliação</h4>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="nome" className="form-label">Nome Completo</label>
                        <input type="text" className="form-control" id="nome" required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input type="tel" className="form-control" id="telefone" required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="servico" className="form-label">Serviço de Interesse</label>
                      <select className="form-select" id="servico" required>
                        <option value="" selected disabled>Selecione um serviço</option>
                        <option value="facial">Tratamentos Faciais</option>
                        <option value="corporal">Tratamentos Corporais</option>
                        <option value="avancado">Estética Avançada</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mensagem" className="form-label">Mensagem</label>
                      <textarea className="form-control" id="mensagem" rows={4}></textarea>
                    </div>
                    <div className="text-end">
                      <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5" style={{ backgroundColor: 'var(--primary-color)' }}>
        <div className="container text-center text-white">
          <h2 className="mb-4">Comece agora seu tratamento</h2>
          <p className="lead mb-4">Entre em contato conosco e agende uma avaliação com nossos especialistas</p>
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <div className="d-flex justify-content-center">
                <div className="me-4">
                  <i className="bi bi-telephone-fill fs-2 mb-2"></i>
                  <p>(11) 99999-9999</p>
                </div>
                <div>
                  <i className="bi bi-envelope-fill fs-2 mb-2"></i>
                  <p>contato@beautyclinic.com</p>
                </div>
              </div>
            </div>
          </div>
          <a href="#contato" className="btn btn-light btn-lg">Entre em contato</a>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h5 className="text-white mb-3">Beauty Clinic</h5>
              <p className="text-white-50">A clínica de estética que valoriza sua beleza natural e bem-estar.</p>
              <p className="text-white-50">© 2023 Beauty Clinic. Todos os direitos reservados.</p>
            </div>
            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="text-white mb-3">Links Rápidos</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#inicio" className="text-white-50 text-decoration-none">Início</a></li>
                <li className="mb-2"><a href="#sobre" className="text-white-50 text-decoration-none">Nos Conheça</a></li>
                <li className="mb-2"><a href="#servicos" className="text-white-50 text-decoration-none">Nossos Serviços</a></li>
                <li className="mb-2"><a href="#depoimentos" className="text-white-50 text-decoration-none">Depoimentos</a></li>
                <li className="mb-2"><a href="#contato" className="text-white-50 text-decoration-none">Contato</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
              <h5 className="text-white mb-3">Tratamentos</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#servicos" className="text-white-50 text-decoration-none">Limpeza de Pele</a></li>
                <li className="mb-2"><a href="#servicos" className="text-white-50 text-decoration-none">Massagem Modeladora</a></li>
                <li className="mb-2"><a href="#servicos" className="text-white-50 text-decoration-none">Radiofrequência</a></li>
                <li className="mb-2"><a href="#servicos" className="text-white-50 text-decoration-none">Microagulhamento</a></li>
                <li className="mb-2"><a href="#servicos" className="text-white-50 text-decoration-none">Depilação a Laser</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4">
              <h5 className="text-white mb-3">Área Restrita</h5>
              <p className="text-white-50">Acesse a área administrativa do sistema.</p>
              <Link href="/login" className="btn btn-outline-light login-btn">
                Login <i className="bi bi-box-arrow-in-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
