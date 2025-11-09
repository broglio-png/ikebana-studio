import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Search, Star, Book, BarChart3, Share2, Plus, X, Filter, ChevronDown, Home, Grid, Sparkles, Heart, Trash2 } from 'lucide-react';

// Componente de Estrela Animada
const AnimatedStar = ({ filled, onClick, size = '2.5rem' }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFilled, setCurrentFilled] = useState(filled);
  
  useEffect(() => {
    setCurrentFilled(filled);
  }, [filled]);
  
  const handleClick = () => {
    setCurrentFilled(!currentFilled); // Muda imediatamente
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <button
      onClick={handleClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: size,
        padding: '0.25rem',
        transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        transform: isAnimating ? 'scale(1.4) rotate(72deg)' : 'scale(1) rotate(0deg)',
        filter: currentFilled ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' : 'none',
        opacity: currentFilled ? 1 : 0.4,
      }}
      onMouseEnter={(e) => {
        if (!isAnimating) e.currentTarget.style.transform = 'scale(1.2) rotate(10deg)';
      }}
      onMouseLeave={(e) => {
        if (!isAnimating) e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
    >
      {currentFilled ? '⭐' : '☆'}
    </button>
  );
};

// Componente de Badge Favorito Animado
const FavoriteBadge = () => {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScale(s => s === 1 ? 1.15 : 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      transform: `scale(${scale})`,
      transition: 'transform 0.4s ease-in-out',
      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))'
    }}>
      ⭐
    </div>
  );
};

// Botão Favoritar Animado
const FavoriteButton = ({ isFavorite, onClick }) => {
  const [isClicking, setIsClicking] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState(isFavorite);
  
  useEffect(() => {
    setCurrentFavorite(isFavorite);
  }, [isFavorite]);
  
  const handleClick = () => {
    setCurrentFavorite(!currentFavorite); // Muda imediatamente
    setIsClicking(true);
    onClick();
    setTimeout(() => setIsClicking(false), 600);
  };
  
  return (
    <button
      onClick={handleClick}
      style={{
        flex: 1,
        padding: '0.75rem',
        background: currentFavorite ? '#ffd700' : 'white',
        border: '2px solid #ffd700',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        transform: isClicking ? 'scale(0.95) rotate(5deg)' : 'scale(1) rotate(0deg)',
        boxShadow: currentFavorite ? '0 4px 15px rgba(255, 215, 0, 0.4)' : '0 2px 8px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => {
        if (!isClicking) e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        if (!isClicking) e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <span style={{
        display: 'inline-flex',
        fontSize: '1.5rem',
        transform: isClicking ? 'rotate(360deg) scale(1.3)' : 'rotate(0deg) scale(1)',
        transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        filter: currentFavorite ? 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))' : 'none'
      }}>
        {currentFavorite ? '⭐' : '☆'}
      </span>
      {currentFavorite ? 'Favoritado' : 'Favoritar'}
    </button>
  );
};

// Base de dados completa dos estudos de Ikebana
const IKEBANA_DATA = {
  'Fundamental / Modelo Básico': [
    { name: 'Expressão do Crescimento Vertical (Tyokussetai) (直生体)', variety: 'Moribana (盛花)' },
    { name: 'Expressão do Crescimento Oblíqua (Shassetai) (斜生体)', variety: 'Moribana (盛花)' },
    { name: 'Expressão do Crescimento Horizontal (Suissetai) (垂生体)', variety: 'Moribana (盛花)' },
    { name: 'Expressão do Crescimento Pendente (Sussetai) (垂生体)', variety: 'Moribana (盛花)' },
    { name: 'Agrupamento (Shuso) (集束)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Três Faces (Sanpo Shomen) (三方正面)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Quatro Faces (Shiho Shomen) (四方正面)', variety: 'Moribana (盛花)' },
    { name: 'Centro de Mesa (Takujyokai) (卓上花)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Simplificação (Shoyaku) (省約)', variety: 'Moribana (盛花)' },
    { name: 'Expressão do Ângulo Forma completa/estrutural (Taikaku) (体格)', variety: 'Moribana (盛花)' }
  ],
  'Fundamental / Desenvolvimento do Modelo Básico': [
    { name: 'Técnica de fixação', variety: 'Nageire (投入)' },
    { name: 'Coesão de Duas Linhas (Nikaku Kossei) (二格構成)', variety: 'Nageire (投入)' },
    { name: 'Expressão de Simplificação (Shoyaku) (省約)', variety: 'Nageire (投入)' },
    { name: 'Expressão do Ângulo Forma completa/estrutural (Taikaku) (体格)', variety: 'Nageire (投入)' }
  ],
  'Fundamental / Aprofundamento do Modelo Básico': [
    { name: 'Expressão do Ângulo Forma completa/estrutural (Taikaku) (体格)', variety: 'Moribana (盛花)' }
  ],
  'Intermediário / Aprofundamento do Modelo Básico': [
    { name: 'Coesão de Duas Linhas (Nikaku Kossei) (二格構成)', variety: 'Nageire (投入)' },
    { name: 'Expressão de Simplificação (Shoyaku) (省約)', variety: 'Nageire (投入)' },
    { name: 'Expressão do Ângulo Forma completa/estrutural (Taikaku) (体格)', variety: 'Nageire (投入)' }
  ],
  'Intermediário / Estudo de Linhas': [
    { name: 'Linha Reta (Tyoku Sen) (直線) Radiante', variety: 'Moribana (盛花)' },
    { name: 'Linha Reta (Tyoku Sen) (直線) Paralela', variety: 'Moribana (盛花)' },
    { name: 'Linha Curva (Kyoku Sen) (曲線) Curva semicircular', variety: 'Moribana (盛花)' },
    { name: 'Linha Curva (Kyoku Sen) (曲線) Dinâmica', variety: 'Moribana (盛花)' },
    { name: 'Linha Curva (Kyoku Sen) (曲線) Sinuosas', variety: 'Moribana (盛花)' },
    { name: 'Linha Reta (Tyoku Sen) (直線) Radiante', variety: 'Nageire (投入)' },
    { name: 'Linha Reta (Tyoku Sen) (直線) Paralela', variety: 'Nageire (投入)' },
    { name: 'Linha Curva (Kyoku Sen) (曲線) Curva semicircular', variety: 'Nageire (投入)' },
    { name: 'Linha Curva (Kyoku Sen) (曲線) Dinâmica', variety: 'Nageire (投入)' },
    { name: 'Linha Curva (Kyoku Sen) (曲線) Sinuosas', variety: 'Nageire (投入)' }
  ],
  'Avançado / Sen Men Massu (Linha, Face e Volume)': [
    { name: 'Estudo de Linha (Sen) (線)', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Face (Men) (面)', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Volume (Men Massu) (塊)', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Face e Volume (Men Massu) (面塊)', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Linha (Sen) (線)', variety: 'Nageire (投入)' },
    { name: 'Estudo de Face (Men) (面)', variety: 'Nageire (投入)' },
    { name: 'Estudo de Volume (Men Massu) (塊)', variety: 'Nageire (投入)' },
    { name: 'Estudo de Face e Volume (Men Massu) (面塊)', variety: 'Nageire (投入)' },
    { name: 'Estudo de Linha e Volume (Sen Massu) (線塊)', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Face e Volume (Men Massu) (面 塊)', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Linha, Face e Volume (Sen Men Massu) (線面塊)', variety: 'Moribana (盛花)' },
    { name: 'Segmentação (Bunkatsu) (分割)', variety: 'Moribana (盛花)' },
    { name: 'Conjunto (Heigo) (併合) Combinação/União', variety: 'Moribana (盛花)' },
    { name: 'Cruzamento (Kosa) (交差)', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Linha e Volume (Sen Massu) (線塊)', variety: 'Nageire (投入)' },
    { name: 'Estudo de Linha, Face e Volume (Sen Men Massu) (線面塊)', variety: 'Nageire (投入)' },
    { name: 'Conjunto (Heigo) (併合) Combinação/União', variety: 'Nageire (投入)' },
    { name: 'Cruzamento (Kosa) (交差)', variety: 'Nageire (投入)' }
  ],
  'Avançado / Sen Men Massu - Diversos materiais': [
    { name: 'Linha (Sen) (線) com Flor /e ou Folha', variety: 'Moribana (盛花)' },
    { name: 'Face (Men) (面) Fina, Larga, Grande, Pequena…', variety: 'Moribana (盛花)' },
    { name: 'Volume (Massu) (塊) com Galho e Fruto', variety: 'Moribana (盛花)' },
    { name: 'Linha, Face e Volume (Sen Men Massu) (線面塊)', variety: 'Moribana (盛花)' },
    { name: 'Linha (Sen) (線) com Flor /e ou Folha', variety: 'Nageire (投入)' },
    { name: 'Face (Men) (面) Fina, Larga, Grande, Pequena…', variety: 'Nageire (投入)' },
    { name: 'Volume (Massu) (塊) com Galho e Fruto', variety: 'Nageire (投入)' },
    { name: 'Linha, Face e Volume (Sen Men Massu) (線面塊)', variety: 'Nageire (投入)' }
  ],
  'Senshukai - Estudo da Utilização do Vaso': [
    { name: 'Estudo do Vaso', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Cor', variety: 'Moribana (盛花)' },
    { name: 'Translúcido', variety: 'Moribana (盛花)' },
    { name: 'Detalhe do Vaso', variety: 'Moribana (盛花)' },
    { name: 'Estudo do Vaso', variety: 'Nageire (投入)' },
    { name: 'Estudo de Cor', variety: 'Nageire (投入)' },
    { name: 'Translúcido', variety: 'Nageire (投入)' },
    { name: 'Detalhe do Vaso', variety: 'Nageire (投入)' }
  ],
  'Senshukai / Estudo do Ambiente': [
    { name: 'Expressão de Três Faces (Sanpo - Shomen) (三方正面)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Quatro Faces (Shiho-Shomen) (四方正面)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Centro de Mesa (Takujyokai) (卓上花)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Três Faces (Sanpo - Shomen) (三方正面)', variety: 'Nageire (投入)' },
    { name: 'Expressão de Quatro Faces (Shiho-Shomen) (四方正面)', variety: 'Nageire (投入)' },
    { name: 'Expressão de Centro de Mesa (Takujyokai) (卓上花)', variety: 'Nageire (投入)' },
    { name: 'Vivificação (Ikinobi) (生伸)', variety: 'Nageire (投入)' },
    { name: 'Vivificação Pendente (Tsuribana) (吊花)', variety: 'Nageire (投入)' },
    { name: 'Mukaeibana (迎花) - "Flor de boas-vindas" recepção', variety: 'Moribana (盛花)' },
    { name: 'Mukaeibana (迎花) - "Flor de boas-vindas" recepção', variety: 'Nageire (投入)' },
    { name: 'Tatebana (竪花) - Arranjo em par/composição dupla', variety: 'Nageire (投入)' }
  ],
  'Senshukai - Conteúdos interiorizados': [
    { name: 'Estudo de Assimetria', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Harmonia e Contraste', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Cor', variety: 'Moribana (盛花)' },
    { name: 'Estudo do Vazio (Proporção Desproporcão)', variety: 'Moribana (盛花)' },
    { name: 'Estudo de Assimetria', variety: 'Nageire (投入)' },
    { name: 'Estudo de Harmonia e Contraste', variety: 'Nageire (投入)' },
    { name: 'Estudo de Cor', variety: 'Nageire (投入)' },
    { name: 'Estudo do Vazio (Proporção Desproporcão)', variety: 'Nageire (投入)' }
  ],
  'Senshukai / Percepção da Qualidade do Material': [
    { name: 'Expressão de Modernidade (Guendaifu) (現代風)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Suavidade (Fuga) (風雅)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Maturidade (Fukaku) (深格)', variety: 'Moribana (盛花)' },
    { name: 'Expressão de Modernidade (Guendaifu) (現代風)', variety: 'Nageire (投入)' },
    { name: 'Expressão de Suavidade (Fuga) (風雅)', variety: 'Nageire (投入)' },
    { name: 'Expressão de Maturidade (Fukaku) (深格)', variety: 'Nageire (投入)' }
  ]
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [showExportImport, setShowExportImport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    graduation: '',
    study: '',
    variety: '',
    favorites: false,
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const importInputRef = useRef(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    loadData();
    
    // Detectar se pode instalar como PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });
    
    // Avisar sobre backup a cada 7 dias
    const lastBackupWarning = localStorage.getItem('lastBackupWarning');
    const daysSinceWarning = lastBackupWarning 
      ? (Date.now() - parseInt(lastBackupWarning)) / (1000 * 60 * 60 * 24)
      : 999;
    
    if (daysSinceWarning > 7 && photos.length > 5) {
      setTimeout(() => {
        if (confirm('💾 Lembrete de Backup!\n\nFaz mais de 7 dias desde o último aviso.\nDeseja fazer backup dos seus dados agora?')) {
          setShowExportImport(true);
        }
        localStorage.setItem('lastBackupWarning', Date.now().toString());
      }, 3000);
    }
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA instalado!');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const loadData = async () => {
    try {
      const photosResult = await window.storage.get('ikebana-photos');
      const albumsResult = await window.storage.get('ikebana-albums');
      
      if (photosResult) setPhotos(JSON.parse(photosResult.value));
      if (albumsResult) setAlbums(JSON.parse(albumsResult.value));
    } catch (error) {
      console.log('Primeira vez usando o app');
    }
  };

  const savePhotos = async (newPhotos) => {
    try {
      setPhotos(newPhotos); // Atualiza o estado PRIMEIRO
      await window.storage.set('ikebana-photos', JSON.stringify(newPhotos));
      console.log('Fotos salvas:', newPhotos.length);
    } catch (error) {
      console.error('Erro ao salvar fotos:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  const saveAlbums = async (newAlbums) => {
    try {
      await window.storage.set('ikebana-albums', JSON.stringify(newAlbums));
      setAlbums(newAlbums);
    } catch (error) {
      console.error('Erro ao salvar álbuns');
    }
  };

  const [newPhoto, setNewPhoto] = useState({
    image: '',
    graduation: '',
    study: '',
    variety: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    tags: '',
    favorite: false,
    rating: 0,
    teacherNotes: ''
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Comprimir imagem antes de salvar
      compressImage(file, (compressedDataUrl) => {
        setNewPhoto(prev => ({ ...prev, image: compressedDataUrl }));
      });
    }
  };

  // Função de compressão de imagem
  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Definir tamanho máximo (1200px na maior dimensão)
        const maxSize = 1200;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Desenhar imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);
        
        // Comprimir para JPEG com qualidade 0.8
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        callback(compressedDataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = async () => {
    if (!newPhoto.image || !newPhoto.graduation || !newPhoto.study) {
      alert('Preencha: Foto, Graduação e Estudo');
      return;
    }

    const photo = { ...newPhoto, id: Date.now(), createdAt: new Date().toISOString() };
    await savePhotos([...photos, photo]);
    setShowAddPhoto(false);
    setNewPhoto({
      image: '', graduation: '', study: '', variety: '', author: '',
      date: new Date().toISOString().split('T')[0], title: '', description: '',
      tags: '', favorite: false, rating: 0, teacherNotes: ''
    });
    setActiveTab('gallery');
  };

  const toggleFavorite = async (id) => {
    const updated = photos.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p);
    await savePhotos(updated);
  };

  const updateRating = async (id, rating) => {
    const updated = photos.map(p => p.id === id ? { ...p, rating } : p);
    await savePhotos(updated);
  };

  const deletePhoto = async (id) => {
    setPhotoToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (photoToDelete) {
      try {
        const updatedPhotos = photos.filter(p => p.id !== photoToDelete);
        setPhotos(updatedPhotos);
        await window.storage.set('ikebana-photos', JSON.stringify(updatedPhotos));
        setSelectedPhoto(null);
        setShowDeleteConfirm(false);
        setPhotoToDelete(null);
      } catch (error) {
        console.error('Erro ao excluir:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPhotoToDelete(null);
  };

  // Exportar dados
  const exportData = async () => {
    try {
      const data = {
        photos,
        albums,
        exportDate: new Date().toISOString(),
        version: '1.0',
        appName: 'Ikebana Studio'
      };
      
      const dataStr = JSON.stringify(data, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `ikebana-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert(`✅ Backup criado com sucesso!\n\n${photos.length} fotos exportadas\n${albums.length} álbuns exportados\n\nArquivo salvo nos Downloads.`);
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('❌ Erro ao criar backup. Tente novamente.');
    }
  };

  // Importar dados
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (!data.appName || data.appName !== 'Ikebana Studio') {
          alert('❌ Arquivo inválido. Selecione um backup do Ikebana Studio.');
          return;
        }
        
        const confirmMsg = `📦 Backup encontrado!\n\nData: ${new Date(data.exportDate).toLocaleDateString('pt-BR')}\nFotos: ${data.photos?.length || 0}\nÁlbuns: ${data.albums?.length || 0}\n\n⚠️ ATENÇÃO: Isso substituirá todos os dados atuais!\n\nDeseja continuar?`;
        
        if (window.confirm(confirmMsg)) {
          // Restaurar dados
          if (data.photos) {
            await window.storage.set('ikebana-photos', JSON.stringify(data.photos));
            setPhotos(data.photos);
          }
          if (data.albums) {
            await window.storage.set('ikebana-albums', JSON.stringify(data.albums));
            setAlbums(data.albums);
          }
          
          setShowExportImport(false);
          alert(`✅ Backup restaurado com sucesso!\n\n${data.photos?.length || 0} fotos importadas\n${data.albums?.length || 0} álbuns importados`);
        }
      } catch (error) {
        console.error('Erro ao importar:', error);
        alert('❌ Erro ao ler arquivo de backup. Verifique se o arquivo está correto.');
      }
    };
    reader.readAsText(file);
  };

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = searchTerm === '' || 
      photo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.study?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.author?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGraduation = !filters.graduation || photo.graduation === filters.graduation;
    const matchesStudy = !filters.study || photo.study === filters.study;
    const matchesVariety = !filters.variety || photo.variety === filters.variety;
    const matchesFavorites = !filters.favorites || photo.favorite;
    const matchesRating = filters.rating === 0 || photo.rating >= filters.rating;

    return matchesSearch && matchesGraduation && matchesStudy && matchesVariety && matchesFavorites && matchesRating;
  });

  const stats = {
    totalPhotos: photos.length,
    uniqueStudies: new Set(photos.map(p => p.study)).size,
    completionPercentage: ((new Set(photos.map(p => p.study)).size / 88) * 100).toFixed(1),
    byGraduation: Object.keys(IKEBANA_DATA).reduce((acc, grad) => {
      const count = photos.filter(p => p.graduation === grad).length;
      const total = IKEBANA_DATA[grad].length;
      acc[grad] = { count, total, percentage: total > 0 ? ((count / total) * 100).toFixed(1) : 0 };
      return acc;
    }, {}),
    byVariety: {
      moribana: photos.filter(p => p.variety && p.variety.includes('Moribana')).length,
      nageire: photos.filter(p => p.variety && p.variety.includes('Nageire')).length
    }
  };

  const sharePhoto = async (photo) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1080;
      canvas.height = 1400;

      // Fundo roxo
      ctx.fillStyle = 'rgb(94, 45, 145)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Carregar e desenhar imagem
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = photo.image;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Desenhar imagem centralizada
      const imgHeight = 800;
      const imgWidth = (img.width / img.height) * imgHeight;
      const imgX = (canvas.width - imgWidth) / 2;
      ctx.drawImage(img, imgX, 50, imgWidth, imgHeight);

      // Adicionar textos
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      
      // Título do estudo
      ctx.font = 'bold 38px Arial';
      const maxWidth = 1000;
      const studyText = photo.study || 'Sem título';
      if (ctx.measureText(studyText).width > maxWidth) {
        ctx.font = 'bold 30px Arial';
      }
      ctx.fillText(studyText, canvas.width / 2, 920);

      // Graduação
      ctx.font = '26px Arial';
      ctx.fillText(photo.graduation || '', canvas.width / 2, 965);
      
      // Variedade
      ctx.font = '26px Arial';
      ctx.fillText(photo.variety || '', canvas.width / 2, 1005);
      
      // Autor (nova linha)
      if (photo.author) {
        ctx.font = '24px Arial';
        ctx.fillText(`Autor: ${photo.author}`, canvas.width / 2, 1045);
      }

      // Avaliação
      if (photo.rating > 0) {
        ctx.font = '36px Arial';
        ctx.fillText('⭐'.repeat(photo.rating), canvas.width / 2, 1100);
      }

      // Assinatura
      ctx.font = 'italic 22px Arial';
      ctx.fillText('Ikebana Studio 🌸', canvas.width / 2, 1360);

      // Converter para blob e fazer download
      canvas.toBlob((blob) => {
        if (!blob) {
          alert('Erro ao gerar imagem. Tente novamente.');
          return;
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ikebana-${photo.study.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('✅ Imagem salva com sucesso!\n\nVocê pode encontrá-la na pasta de Downloads do seu dispositivo. 📥');
      }, 'image/png');
      
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      alert('❌ Erro ao gerar imagem de compartilhamento.\n\nTente novamente ou tire um screenshot da foto.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #5e2d91 0%, #7b4ba3 100%)' }}>
      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, maxWidth: '90%', width: '400px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📱</div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#5e2d91' }}>Instalar Ikebana Studio</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Instale como app no seu dispositivo para acesso rápido!</p>
              </div>
              <button onClick={() => setShowInstallPrompt(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setShowInstallPrompt(false)} style={{ flex: 1, padding: '0.75rem', background: '#f0f0f0', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, color: '#666' }}>
                Agora não
              </button>
              <button onClick={installPWA} style={{ flex: 1, padding: '0.75rem', background: '#5e2d91', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}>
                Instalar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '1rem', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={28} color="white" />
            <div>
              <h1 style={{ margin: 0, color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Ikebana Studio</h1>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>{photos.length} fotos • {stats.uniqueStudies} estudos</p>
            </div>
          </div>
          <button onClick={() => setShowAddPhoto(true)} style={{ background: 'white', color: '#5e2d91', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <Plus size={20} /> Adicionar
          </button>
          <button onClick={() => setShowExportImport(true)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white', padding: '0.75rem 1.5rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
            <Upload size={20} /> Backup
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {[
            { id: 'home', icon: Home, label: 'Início' },
            { id: 'gallery', icon: Grid, label: 'Galeria' },
            { id: 'catalog', icon: Book, label: 'Catálogo' },
            { id: 'progress', icon: BarChart3, label: 'Progresso' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: activeTab === tab.id ? 'white' : 'transparent', color: activeTab === tab.id ? '#5e2d91' : 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', paddingBottom: '4rem' }}>
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#5e2d91', fontSize: '1.75rem' }}>Bem-vindo ao Ikebana Studio 🌸</h2>
              <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>Organize e acompanhe sua jornada na arte floral japonesa.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f8f5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{photos.length}</div>
                  <div style={{ color: '#5e2d91', fontWeight: 600 }}>Fotos</div>
                </div>
                <div style={{ background: '#f8f5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stats.uniqueStudies}</div>
                  <div style={{ color: '#5e2d91', fontWeight: 600 }}>Estudos</div>
                </div>
                <div style={{ background: '#f8f5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stats.completionPercentage}%</div>
                  <div style={{ color: '#5e2d91', fontWeight: 600 }}>Conclusão</div>
                </div>
              </div>

              <h3 style={{ margin: '1.5rem 0 1rem 0', color: '#5e2d91' }}>Últimas Fotos</h3>
              {photos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📸</div>
                  <p>Nenhuma foto ainda. Clique em "Adicionar" para começar!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                  {photos.slice(-6).reverse().map(photo => (
                    <div key={photo.id} onClick={() => { setSelectedPhoto(photo); setActiveTab('gallery'); }} style={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s', position: 'relative' }}>
                      <img src={photo.image} alt={photo.study} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                      {photo.favorite && <FavoriteBadge />}
                      <div style={{ padding: '0.75rem', background: '#f8f5ff' }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#5e2d91', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{photo.study}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div>
            {/* Search and Filters */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '1rem' }}
                  />
                </div>
                <button onClick={() => setShowFilters(!showFilters)} style={{ padding: '0.75rem 1.5rem', background: showFilters ? '#5e2d91' : 'white', color: showFilters ? 'white' : '#5e2d91', border: '2px solid #5e2d91', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Filter size={18} /> Filtros
                </button>
              </div>

              {showFilters && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f5ff', borderRadius: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#5e2d91', fontWeight: 600 }}>Graduação</label>
                    <select value={filters.graduation} onChange={(e) => setFilters({...filters, graduation: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
                      <option value="">Todas</option>
                      {Object.keys(IKEBANA_DATA).map(grad => <option key={grad} value={grad}>{grad}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#5e2d91', fontWeight: 600 }}>Variedade</label>
                    <select value={filters.variety} onChange={(e) => setFilters({...filters, variety: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
                      <option value="">Todas</option>
                      <option value="Moribana (盛花)">Moribana (盛花)</option>
                      <option value="Nageire (投入)">Nageire (投入)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#5e2d91', fontWeight: 600 }}>Avaliação mínima</label>
                    <select value={filters.rating} onChange={(e) => setFilters({...filters, rating: Number(e.target.value)})} style={{ width: '100%', padding: '0.5rem', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
                      <option value="0">Todas</option>
                      <option value="1">⭐ 1+</option>
                      <option value="2">⭐ 2+</option>
                      <option value="3">⭐ 3+</option>
                      <option value="4">⭐ 4+</option>
                      <option value="5">⭐ 5</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem' }}>
                      <input type="checkbox" checked={filters.favorites} onChange={(e) => setFilters({...filters, favorites: e.target.checked})} />
                      <span style={{ color: '#5e2d91', fontWeight: 600 }}>Apenas favoritos</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Grid */}
            {filteredPhotos.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                <p style={{ color: '#999', fontSize: '1.1rem' }}>Nenhuma foto encontrada</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {filteredPhotos.map(photo => (
                  <div key={photo.id} onClick={() => setSelectedPhoto(photo)} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s', position: 'relative' }}>
                    <img src={photo.image} alt={photo.study} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                    {photo.favorite && <FavoriteBadge />}
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#5e2d91', fontSize: '1rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{photo.study}</h3>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.85rem' }}>{photo.graduation}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#999', fontSize: '0.85rem' }}>{photo.variety}</span>
                        {photo.rating > 0 && <span>{'⭐'.repeat(photo.rating)}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CATALOG TAB */}
        {activeTab === 'catalog' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 1.5rem 0', color: '#5e2d91', fontSize: '1.75rem' }}>88 Estudos de Ikebana</h2>
            {Object.entries(IKEBANA_DATA).map(([graduation, studies]) => (
              <div key={graduation} style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#5e2d91', marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '2px solid #5e2d91', paddingBottom: '0.5rem' }}>{graduation}</h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {studies.map((study, idx) => {
                    const completed = photos.some(p => p.study === study.name);
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: completed ? '#e8f5e9' : '#f8f5ff', borderRadius: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: completed ? '#4caf50' : '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', flexShrink: 0 }}>
                          {completed ? '✓' : idx + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.25rem' }}>{study.name}</div>
                          <div style={{ fontSize: '0.85rem', color: '#666' }}>{study.variety}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === 'progress' && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 1.5rem 0', color: '#5e2d91', fontSize: '1.75rem' }}>Seu Progresso</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f8f5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stats.totalPhotos}</div>
                  <div style={{ color: '#5e2d91', fontWeight: 600 }}>Total de Fotos</div>
                </div>
                <div style={{ background: '#f8f5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stats.uniqueStudies}/88</div>
                  <div style={{ color: '#5e2d91', fontWeight: 600 }}>Estudos Completos</div>
                </div>
                <div style={{ background: '#f8f5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{stats.completionPercentage}%</div>
                  <div style={{ color: '#5e2d91', fontWeight: 600 }}>Conclusão</div>
                </div>
              </div>

              <h3 style={{ color: '#5e2d91', marginBottom: '1rem' }}>Progresso por Graduação</h3>
              {Object.entries(stats.byGraduation).map(([grad, data]) => (
                <div key={grad} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: '#333' }}>{grad}</span>
                    <span style={{ color: '#666' }}>{data.count}/{data.total} ({data.percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '12px', background: '#e0e0e0', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${data.percentage}%`, height: '100%', background: 'linear-gradient(90deg, #5e2d91, #7b4ba3)', transition: 'width 0.3s' }} />
                  </div>
                </div>
              ))}

              <h3 style={{ color: '#5e2d91', marginTop: '2rem', marginBottom: '1rem' }}>Distribuição por Variedade</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: '#f8f5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stats.byVariety.moribana}</div>
                  <div style={{ color: '#5e2d91', fontWeight: 600 }}>Moribana</div>
                </div>
                <div style={{ background: '#f8f5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stats.byVariety.nageire}</div>
                  <div style={{ color: '#5e2d91', fontWeight: 600 }}>Nageire</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Photo */}
      {showAddPhoto && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={() => setShowAddPhoto(false)}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#5e2d91' }}>Adicionar Foto</h2>
              <button onClick={() => setShowAddPhoto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {!newPhoto.image ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  <input 
                    ref={cameraInputRef} 
                    type="file" 
                    accept="image/*" 
                    capture="user"
                    onChange={handleFileSelect} 
                    style={{ display: 'none' }} 
                  />
                  
                  <button 
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                        fileInputRef.current.click();
                      }
                    }} 
                    style={{ padding: '2rem', border: '2px dashed #5e2d91', borderRadius: '12px', background: '#f8f5ff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#5e2d91', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#ede7f6'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f8f5ff'}
                  >
                    <Upload size={32} />
                    <span style={{ fontWeight: 600 }}>Selecionar da Galeria</span>
                    <span style={{ fontSize: '0.85rem', color: '#999' }}>Escolher foto existente</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (cameraInputRef.current) {
                        cameraInputRef.current.value = '';
                        cameraInputRef.current.click();
                      }
                    }} 
                    style={{ padding: '2rem', border: '2px dashed #5e2d91', borderRadius: '12px', background: '#f8f5ff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#5e2d91', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#ede7f6'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f8f5ff'}
                  >
                    <Camera size={32} />
                    <span style={{ fontWeight: 600 }}>Tirar Foto</span>
                    <span style={{ fontSize: '0.85rem', color: '#999' }}>Usar câmera agora</span>
                  </button>
                </div>
              ) : (
                <>
                  <img src={newPhoto.image} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Graduação *</label>
                    <select value={newPhoto.graduation} onChange={(e) => setNewPhoto({...newPhoto, graduation: e.target.value, study: '', variety: ''})} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '1rem' }}>
                      <option value="">Selecione...</option>
                      {Object.keys(IKEBANA_DATA).map(grad => <option key={grad} value={grad}>{grad}</option>)}
                    </select>
                  </div>

                  {newPhoto.graduation && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Estudo *</label>
                      <select value={newPhoto.study} onChange={(e) => {
                        const study = IKEBANA_DATA[newPhoto.graduation].find(s => s.name === e.target.value);
                        setNewPhoto({...newPhoto, study: e.target.value, variety: study?.variety || ''});
                      }} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '1rem' }}>
                        <option value="">Selecione...</option>
                        {IKEBANA_DATA[newPhoto.graduation].map((study, idx) => <option key={idx} value={study.name}>{study.name}</option>)}
                      </select>
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Variedade</label>
                    <select value={newPhoto.variety} onChange={(e) => setNewPhoto({...newPhoto, variety: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '1rem' }}>
                      <option value="">[...]</option>
                      <option value="Moribana (盛花)">Moribana (盛花)</option>
                      <option value="Nageire (投入)">Nageire (投入)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Autor</label>
                    <input type="text" value={newPhoto.author} onChange={(e) => setNewPhoto({...newPhoto, author: e.target.value})} placeholder="Seu nome" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Data</label>
                    <input type="date" value={newPhoto.date} onChange={(e) => setNewPhoto({...newPhoto, date: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Título</label>
                    <input type="text" value={newPhoto.title} onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})} placeholder="Título personalizado" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Descrição</label>
                    <textarea value={newPhoto.description} onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})} placeholder="Descreva seu arranjo..." rows="3" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Tags</label>
                    <input type="text" value={newPhoto.tags} onChange={(e) => setNewPhoto({...newPhoto, tags: e.target.value})} placeholder="primavera, cores quentes..." style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>Notas do Professor</label>
                    <textarea value={newPhoto.teacherNotes} onChange={(e) => setNewPhoto({...newPhoto, teacherNotes: e.target.value})} placeholder="Feedback e observações..." rows="2" style={{ width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '10px', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>

                  <button onClick={handleAddPhoto} style={{ padding: '1rem', background: '#5e2d91', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem' }}>
                    Salvar Foto
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Photo */}
      {selectedPhoto && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={() => setSelectedPhoto(null)}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: '#5e2d91' }}>{selectedPhoto.study}</h2>
              <button onClick={() => setSelectedPhoto(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={24} />
              </button>
            </div>

            <img src={selectedPhoto.image} alt={selectedPhoto.study} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', borderRadius: '12px', marginBottom: '1.5rem' }} />

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f5ff', borderRadius: '10px' }}>
                <span style={{ fontWeight: 600, color: '#5e2d91' }}>Graduação:</span>
                <span>{selectedPhoto.graduation}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f5ff', borderRadius: '10px' }}>
                <span style={{ fontWeight: 600, color: '#5e2d91' }}>Variedade:</span>
                <span>{selectedPhoto.variety}</span>
              </div>
              {selectedPhoto.author && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f5ff', borderRadius: '10px' }}>
                  <span style={{ fontWeight: 600, color: '#5e2d91' }}>Autor:</span>
                  <span>{selectedPhoto.author}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8f5ff', borderRadius: '10px' }}>
                <span style={{ fontWeight: 600, color: '#5e2d91' }}>Data:</span>
                <span>{new Date(selectedPhoto.date).toLocaleDateString('pt-BR')}</span>
              </div>
              {selectedPhoto.description && (
                <div style={{ padding: '1rem', background: '#f8f5ff', borderRadius: '10px' }}>
                  <span style={{ fontWeight: 600, color: '#5e2d91', display: 'block', marginBottom: '0.5rem' }}>Descrição:</span>
                  <p style={{ margin: 0 }}>{selectedPhoto.description}</p>
                </div>
              )}
              {selectedPhoto.teacherNotes && (
                <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '10px' }}>
                  <span style={{ fontWeight: 600, color: '#f57c00', display: 'block', marginBottom: '0.5rem' }}>Notas do Professor:</span>
                  <p style={{ margin: 0 }}>{selectedPhoto.teacherNotes}</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <FavoriteButton isFavorite={selectedPhoto.favorite} onClick={() => toggleFavorite(selectedPhoto.id)} />
              <button onClick={() => sharePhoto(selectedPhoto)} style={{ flex: 1, padding: '0.75rem', background: '#5e2d91', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
                <Share2 size={20} />
                Compartilhar
              </button>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#5e2d91' }}>Sua Avaliação:</label>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map(rating => (
                  <AnimatedStar
                    key={rating}
                    filled={rating <= selectedPhoto.rating}
                    onClick={() => updateRating(selectedPhoto.id, rating)}
                  />
                ))}
              </div>
            </div>

            <button onClick={() => deletePhoto(selectedPhoto.id)} style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: '#ff5252', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Trash2 size={20} />
              Excluir Foto
            </button>
          </div>
        </div>
      )}
      {/* Modal: Export/Import */}
      {showExportImport && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem' }} onClick={() => setShowExportImport(false)}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '500px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#5e2d91' }}>Backup de Dados</h2>
              <button onClick={() => setShowExportImport(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fff3cd', borderRadius: '10px', border: '2px solid #ffc107' }}>
              <p style={{ margin: 0, color: '#856404', lineHeight: 1.6, fontSize: '0.9rem' }}>
                <strong>⚠️ Importante:</strong> Faça backup regularmente! Os dados são salvos apenas neste dispositivo e podem ser perdidos se você limpar o cache do navegador.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              <button onClick={exportData} style={{ padding: '1.5rem', background: '#5e2d91', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.3s' }}>
                <Upload size={24} />
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Exportar Dados</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Baixar backup de todas as fotos e álbuns</div>
                </div>
              </button>

              <button onClick={() => importInputRef.current?.click()} style={{ padding: '1.5rem', background: 'white', color: '#5e2d91', border: '2px solid #5e2d91', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.3s' }}>
                <Upload size={24} style={{ transform: 'rotate(180deg)' }} />
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Importar Dados</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Restaurar de um arquivo de backup</div>
                </div>
              </button>
              <input ref={importInputRef} type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />

              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f5ff', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>
                  <strong style={{ color: '#5e2d91' }}>💾 Armazenamento atual:</strong><br />
                  {photos.length} fotos • {albums.length} álbuns<br />
                  <span style={{ fontSize: '0.85rem', color: '#999' }}>
                    {photos.length > 0 && `Última foto: ${new Date(photos[photos.length - 1]?.createdAt || Date.now()).toLocaleDateString('pt-BR')}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {showDeleteConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ margin: '0 0 1rem 0', color: '#5e2d91' }}>Excluir Foto?</h2>
            <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>Esta ação não pode ser desfeita. A foto será permanentemente excluída.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={cancelDelete} style={{ flex: 1, padding: '1rem', background: 'white', border: '2px solid #e0e0e0', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, color: '#666' }}>
                Cancelar
              </button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '1rem', background: '#ff5252', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
