import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const labelMap = {
  department_automation_count: 'Automatización',                           
  department_management_count: 'gerencia',                            
  department_strategy_count: 'estrategia',                            
  department_commercial_count: 'comercial',                            
  department_operational_count: 'operaciones',   

  core_automation_count: 'automatización',                           
  core_management_count: 'gerencia',                            
  core_strategy_count: 'estrategia',                            
  core_commercial_count: 'comercial',                            
  core_operational_count: 'operaciones',                            

  profile_automation_count: 'automatización',                           
  profile_management_count: 'gerencia',                            
  profile_strategy_count: 'estrategia',                            
  profile_commercial_count: 'comercial',                            
  profile_operational_count: 'operaciones',     
  "Activos": 'Activos',
  "Termino su convenio": 'Convenio finalizado',
  "Retirado": 'Retirado',
}

const Barras = ({ barras }) => {    

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={barras} barSize={30}>
        <XAxis
          dataKey={'name'}          
          tickFormatter={(value) => {
            const words = value.split(" ");
            if (words.length > 1) {
              return `${words[0].slice(0, 3)}. ${words.slice(1).join(" ")}`;
            }
            return value;
          }}
        />
        <YAxis />
        <Legend 
          formatter={(name) => [labelMap[name]]}          
        />
        <Tooltip
          formatter={(value, name) => [value, labelMap[name]]}
          labelStyle={{color: "black", fontWeight: 'bold', textTransform: "uppercase" }}
          contentStyle={{fontFamily: 'sans-serif', fontWeight: "medium", fontSize: "16px" }}
          itemStyle={{ padding: 3, margin: 0 }}
        />        
        <CartesianGrid
          strokeDasharray="1 0"
          horizontal={true}
          vertical={false}
        />                
        <Bar
          dataKey={'Activos'}
          fill="#496ddb"
          background={{fill: '#1e2e39'}}
          />                              
        <Bar
          dataKey={'Termino su convenio'}
          background={{fill: '#1e2e39'}}
          fill="#e16036"
          />        
        <Bar
          background={{fill: '#1e2e39'}}
          dataKey={'Retirado'}
          fill="#136f63"
        />        
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barras;
