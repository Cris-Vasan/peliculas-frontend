// Función de prueba específica para productoras
export const testProductoraAPI = async () => {
  try {
    console.log("🧪 Probando API de Productoras...")
    
    // Obtener productoras existentes
    const response = await fetch('http://localhost:4000/api/productoras')
    if (response.ok) {
      const productoras = await response.json()
      console.log("📊 Productoras existentes:", productoras)
      
      if (productoras.length > 0) {
        const productora = productoras[0]
        console.log(`🏢 Primera productora:`, productora)
        console.log(`🎯 Estado actual: "${productora.estado}" (tipo: ${typeof productora.estado})`)
        
        // Probar diferentes formatos de estado
        const testCases = [
          { estado: "Activo", descripcion: "string Activo (como en BD)" },
          { estado: "Inactivo", descripcion: "string Inactivo" },
          { estado: true, descripcion: "boolean true" },
          { estado: false, descripcion: "boolean false" },
          { estado: "Activa", descripcion: "string Activa" },
          { estado: "Inactiva", descripcion: "string Inactiva" },
          { estado: "activo", descripcion: "string activo (minúscula)" },
          { estado: "inactivo", descripcion: "string inactivo (minúscula)" }
        ]
        
        for (const testCase of testCases) {
          console.log(`\n🔬 Probando con ${testCase.descripcion}:`)
          
          const updateData = {
            nombre: productora.nombre,
            slogan: productora.slogan || '',
            descripcion: productora.descripcion || '',
            estado: testCase.estado
          }
          
          console.log("📤 Enviando:", updateData)
          
          const updateResponse = await fetch(`http://localhost:4000/api/productoras/${productora._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
          })
          
          console.log(`📥 Status: ${updateResponse.status}`)
          
          if (updateResponse.ok) {
            const result = await updateResponse.json()
            console.log("✅ ¡ÉXITO! Formato aceptado:", testCase.descripcion)
            console.log("📋 Resultado:", result)
            break // Si funciona, no probar más
          } else {
            const errorText = await updateResponse.text()
            console.log("❌ Error:", errorText)
          }
        }
      }
    }
  } catch (error) {
    console.error("💥 Error en test:", error)
  }
}

// Para usar: testProductoraAPI()
